// Les paramètres de la demande POST pour obtenir le jeton d'accès
const clientId = localStorage.getItem('spotifyClientId');
const clientSecret = localStorage.getItem('spotifyClientSecret');
const scope = 'user-modify-playback-state streaming';
const postData = new URLSearchParams({
  grant_type: 'client_credentials',
  client_id: clientId,
  client_secret: clientSecret,
  scope: scope
});

// Options de la requête
let requestOptions = {
  method: 'POST',
  headers: {
    'Content-Type': 'application/x-www-form-urlencoded'
  },
  body: postData
};
console.log(requestOptions);

// URL de la requête
let url = 'https://accounts.spotify.com/api/token';

// Effectuez la requête POST
fetch(url, requestOptions)
  .then(response => response.json())
  .then(data => {
    console.log(data);
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

  // Add error listener to handle any player errors
  player.addListener('initialization_error', ({ message }) => {
    console.error('Spotify player initialization error:', message);
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
  if (!device_id) {
    console.error('Device ID is undefined. Make sure the device is properly connected.');
    return;
  }

  document.getElementById('play-track').addEventListener('click', function() {
    console.log('click');
    playTrack(device_id);
  })

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
