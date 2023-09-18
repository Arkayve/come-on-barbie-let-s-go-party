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
let url_2 = 'https://api.spotify.com/v1/artists/6mdiAmATAx73kdxrNrnlao';

// Options de la requête avec l'en-tête d'autorisation
let requestOptions_2 = {
  method: 'GET',
  headers: {
    'Authorization': `Bearer ${accessToken}`
  }
};

// Effectuez la requête GET
fetch(url_2, requestOptions_2)
  .then(response => response.json())
  .then(data => {
    // Utilisez les données de la réponse comme nécessaire
    console.log('Données de l\'artiste Spotify:', data);
  })
  .catch(error => {
    console.error('Erreur lors de la requête GET :', error);
  });








  window.onSpotifyWebPlaybackSDKReady = () => {
    initializeSpotifyPlayer();
  };
  
  function initializeSpotifyPlayer() {


  const player = new Spotify.Player({
    name: 'My Web Player',
    getOAuthToken: callback => {
      callback(accessToken);
    }
  });
  
  // Add listeners for player events (e.g., "ready", "player_state_changed")
  player.addListener('ready', ({ device_id }) => {
    console.log('device_id : ', device_id);
    if (device_id) {
      console.log('Spotify player is ready with device ID', device_id);

      // Play a Spotify track when the player is ready
      playTrack(device_id);
    } else {
      console.error('Device ID is undefined. Player may not be connected properly.');
    }
  });
  
  // Connect to the Spotify player
  player.connect().then(success => {
    if (success) {
      console.log('Connected to Spotify player');
    } else {
      console.error('Failed to connect to Spotify player');
    }
  });
}
  
  function playTrack(device_id) {
    fetch(`https://api.spotify.com/v1/me/player/play?device_id=${device_id}`, {
      method: 'PUT',
      headers: {
        'Authorization': `Bearer ${accessToken}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        uris: ['spotify:track:4OROzZUy6gOWN4UGQVaZMF'] // Replace with the URI of the track you want to play
      })
    })
    .then(response => {
      if (response.ok) {
        console.log('Track started playing successfully.');
      } else {
        console.error('Error starting track:', response.status);
      }
    })
    .catch(error => {
      console.error('Error starting track:', error);
    });
  }









// URL de la requête GET
let url_3 = 'https://api.spotify.com/v1/me/player/devices';

// Options de la requête avec l'en-tête d'autorisation
let requestOptions_3 = {
  method: 'GET',
  headers: {
    'Authorization': `Bearer ${accessToken}`
  }
};

// Effectuez la requête GET pour obtenir la liste des appareils connectés
fetch(url_3, requestOptions_3)
  .then(response => response.json())
  .then(data => {
    // Utilisez les données de la réponse comme nécessaire
    console.log(data);
    console.log('Liste des appareils connectés :', data.devices);
  })
  .catch(error => {
    console.error('Erreur lors de la requête GET pour les appareils :', error);
  });