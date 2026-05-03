export default async function handler(request, response) {
  const { league } = request.query;
  const FD_KEY = 'c1c9cfed0b354edca2ce6b220447352c'; // Tu llave del API

  const leagues = {
    'll': 2014, 'pl': 2021, 'bl': 2002, 'sa': 2019, 'l1': 2015
  };

  const competitionId = leagues[league] || 2014;

  try {
    const res = await fetch(`https://api.football-data.org/v4/competitions/${competitionId}/standings`, {
      headers: { 'X-Auth-Token': FD_KEY }
    });

    if (!res.ok) throw new Error(`Error de API: ${res.status}`);

    const data = await res.json();
    
    // Configurar cabeceras para evitar bloqueos
    response.setHeader('Access-Control-Allow-Origin', '*');
    response.status(200).json(data);
  } catch (error) {
    response.status(500).json({ error: error.message });
  }
}
