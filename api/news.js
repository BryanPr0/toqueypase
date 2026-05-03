export default async function handler(request, response) {
  const API_KEY = 'a09b08c2e7064d4980a47b842499023d'; 
  try {
    const res = await fetch(`https://newsapi.org/v2/everything?q=futbol&language=es&apiKey=${API_KEY}`);
    const data = await res.json();
    response.setHeader('Access-Control-Allow-Origin', '*');
    response.status(200).json(data);
  } catch (error) {
    response.status(500).json({ error: error.message });
  }
}
