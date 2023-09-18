// Les paramètres de la demande POST pour obtenir le jeton d'accès
const clientId = '8bd47bc26ab94bb881b0128f77d2ef5b';
const clientSecret = 'ecbfa94f20fc4523920ca9e41d057f2d';
const postData = new URLSearchParams({
  grant_type: 'client_credentials',
  client_id: clientId,
  client_secret: clientSecret
});

// Options de la requête
let requestOptions = {
  method: 'POST',
  headers: {
    'Content-Type': 'application/x-www-form-urlencoded'
  },
  body: postData
};

// URL de la requête
let url = 'https://accounts.spotify.com/api/token';

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

  








  // Remplacez cette valeur par votre jeton d'accès Spotify
const accessToken = localStorage.getItem('spotifyAccessToken');

// URL de la requête GET
url = 'https://api.spotify.com/v1/artists/6mdiAmATAx73kdxrNrnlao';

// Options de la requête avec l'en-tête d'autorisation
requestOptions = {
  method: 'GET',
  headers: {
    'Authorization': `Bearer ${accessToken}`
  }
};

// Effectuez la requête GET
fetch(url, requestOptions)
  .then(response => response.json())
  .then(data => {
    // Utilisez les données de la réponse comme nécessaire
    console.log('Données de l\'artiste Spotify:', data);
  })
  .catch(error => {
    console.error('Erreur lors de la requête GET :', error);
  });