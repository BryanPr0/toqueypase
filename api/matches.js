export default async function handler(request, response) {
  const FD_KEY = '5374b49561354a1e956ad23bf0b33d92';
  try {
    const res = await fetch('https://api.football-data.org/v4/matches', {
      headers: { 'X-Auth-Token': FD_KEY }
    });
    const data = await res.json();
    response.setHeader('Access-Control-Allow-Origin', '*');
    response.status(200).json(data);
  } catch (error) {
    response.status(500).json({ error: error.message });
  }
}
