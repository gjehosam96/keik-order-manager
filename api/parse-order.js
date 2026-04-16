// api/parse-order.js
// Vercel Serverless Function — panggil Claude API dengan aman di server
// URL endpoint otomatis: https://keik-order-manager.vercel.app/api/parse-order

export default async function handler(req, res) {
  // Hanya terima POST
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const { text } = req.body;
  if (!text) {
    return res.status(400).json({ error: 'Text is required' });
  }

  const API_KEY = process.env.ANTHROPIC_API_KEY;
  if (!API_KEY) {
    return res.status(500).json({ error: 'API key not configured' });
  }

  const systemPrompt = `Ekstrak data order dari teks dan kembalikan HANYA JSON valid tanpa markdown:
{"nama":"","alamat":"","noHp":"","tanggalKirim":"DD-MM-YYYY atau kosong","pengiriman":"Pickup|TIKI|Instant","jenisBox":"Box Biasa|Sincia|Imlek|Natal|Polos","keterangan":"","items":[{"kat":"lapis|kering","produk":"","mentega":"Butter|Wisman","rasa":"Original|Plum|Keju|Coklat|Almond|Nanas","qty":1,"harga":0}]}

Produk Lapis: Lapis Bulat, Lapis Persegi, Lapis 11x22, Lapis 10x10, Lapis Mini Bites, Lapis Mix 4 Rasa.
Produk Kering: Nastar Wisman, Kastengel, Lidah Kucing, Putri Salju, Semprit Mawar, Sagu Keju.

ATURAN mentega: Ada Wisman/Wysman -> Wisman. Tidak ada -> Butter.
ATURAN noHp: Hapus - dan spasi. +628/628 -> 08.
ATURAN tanggalKirim: Konversi ke DD-MM-YYYY.
Field tidak ada -> string kosong atau 0.`;

  try {
    const response = await fetch('https://api.anthropic.com/v1/messages', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'x-api-key': API_KEY,
        'anthropic-version': '2023-06-01'
      },
      body: JSON.stringify({
        model: 'claude-sonnet-4-5',
        max_tokens: 1000,
        system: systemPrompt,
        messages: [{ role: 'user', content: text }]
      })
    });

    if (!response.ok) {
      const err = await response.text();
      return res.status(response.status).json({ error: err });
    }

    const data = await response.json();
    const textResponse = data.content.map(x => x.text || '').join('').replace(/```json|```/g, '').trim();
    const parsed = JSON.parse(textResponse);

    return res.status(200).json(parsed);
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
}
