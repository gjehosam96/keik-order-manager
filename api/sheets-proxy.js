// api/sheets-proxy.js
// Vercel Serverless — kirim data ke Google Sheets
// Handle redirect 302 dari Google Apps Script

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const { url, payload } = req.body;
  if (!url || !payload) {
    return res.status(400).json({ error: 'url and payload required' });
  }

  try {
    const body = JSON.stringify(payload);

    // Step 1: POST ke URL Apps Script (akan redirect 302)
    const r1 = await fetch(url, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: body,
      redirect: 'manual'
    });

    // Step 2: Kalau redirect, POST ulang ke URL tujuan dengan body yang sama
    if (r1.status >= 300 && r1.status < 400) {
      const redirectUrl = r1.headers.get('location');
      if (redirectUrl) {
        const r2 = await fetch(redirectUrl, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: body,
          redirect: 'follow'
        });
        return res.status(200).json({ ok: true, status: r2.status });
      }
    }

    // Kalau tidak redirect (langsung 200)
    return res.status(200).json({ ok: true, status: r1.status });
  } catch (error) {
    return res.status(500).json({ ok: false, error: error.message });
  }
}
