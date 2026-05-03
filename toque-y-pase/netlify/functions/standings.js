exports.handler = async function(event) {
  const league = event.queryStringParameters && event.queryStringParameters.league;
  const leagueMap = {
    'll': 2014,  // LaLiga
    'pl': 2021,  // Premier League
    'bl': 2002,  // Bundesliga
    'sa': 2019,  // Serie A
    'l1': 2015   // Ligue 1
  };

  const leagueId = leagueMap[league];
  if (!leagueId) {
    return { statusCode: 400, body: JSON.stringify({ error: 'Liga no válida' }) };
  }

  try {
    const response = await fetch(
      `https://api.football-data.org/v4/competitions/${leagueId}/standings`,
      { headers: { 'X-Auth-Token': process.env.FD_API_KEY } }
    );

    if (!response.ok) throw new Error(`HTTP ${response.status}`);
    const data = await response.json();

    return {
      statusCode: 200,
      headers: {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*',
        'Cache-Control': 'public, max-age=300' // caché 5 min
      },
      body: JSON.stringify(data)
    };
  } catch (err) {
    return {
      statusCode: 500,
      body: JSON.stringify({ error: err.message })
    };
  }
};
