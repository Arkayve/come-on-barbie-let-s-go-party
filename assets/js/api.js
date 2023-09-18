// Les paramètres de la demande POST pour obtenir le jeton d'accès
const clientId = '8bd47bc26ab94bb881b0128f77d2ef5b';
const clientSecret = 'ecbfa94f20fc4523920ca9e41d057f2d';
const postData = new URLSearchParams({
  grant_type: 'client_credentials',
  client_id: clientId,
  client_secret: clientSecret
});

// Options de la requête
const requestOptions = {
  method: 'POST',
  headers: {
    'Content-Type': 'application/x-www-form-urlencoded'
  },
  body: postData
};

// URL de la requête
const url = 'https://accounts.spotify.com/api/token';

// Effectuez la requête POST
fetch(url, requestOptions)
  .then(response => response.json())
  .then(data => {
    // Stockez la réponse dans le localStorage ou utilisez-la comme nécessaire
    localStorage.setItem('spotifyAccessToken', data.access_token);
  })
  .catch(error => {
    console.error('Erreur lors de la requête POST :', error);
  });