export default async function handler(req, res) {
  const apiKey = process.env.API_SPORTS_KEY;
  
  if (!apiKey) {
    return res.status(500).json({ error: "Clé API secrète manquante sur Vercel." });
  }

  const { date } = req.query;
  const targetDate = date || new Date().toISOString().split('T')[0];

  try {
    const apiResponse = await fetch(`https://api-sports.io{targetDate}`, {
      method: 'GET',
      headers: {
        'x-rapidapi-key': apiKey,
        'x-rapidapi-host': 'v3.football.api-sports.io'
      }
    });

    if (!apiResponse.ok) throw new Error(`Erreur API: ${apiResponse.status}`);

    const data = await apiResponse.json();
    
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Content-Type', 'application/json');
    return res.status(200).json(data);

  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
}
