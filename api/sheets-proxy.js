// api/sheets-proxy.js
// Vercel Serverless — kirim data ke Google Sheets dari server (bypass CORS)

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const { url, payload } = req.body;

  if (!url || !payload) {
    return res.status(400).json({ error: 'url and payload required' });
  }

  try {
    const response = await fetch(url, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload),
      redirect: 'follow'
    });

    return res.status(200).json({ ok: true, status: response.status });
  } catch (error) {
    return res.status(500).json({ ok: false, error: error.message });
  }
}
