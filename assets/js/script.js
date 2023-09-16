
// try to connect to spotify's api

// function generateRandomString(length) {
//     let text = '';
//     let possible = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  
//     for (let i = 0; i < length; i++) {
//       text += possible.charAt(Math.floor(Math.random() * possible.length));
//     }
//     return text;
//   }

// //   const digest = await window.crypto.subtle.digest('SHA-256', data);

//   async function generateCodeChallenge(codeVerifier) {
//     function base64encode(string) {
//       return btoa(String.fromCharCode.apply(null, new Uint8Array(string)))
//         .replace(/\+/g, '-')
//         .replace(/\//g, '_')
//         .replace(/=+$/, '');
//     }
  
//     const encoder = new TextEncoder();
//     const data = encoder.encode(codeVerifier);
//     const digest = await window.crypto.subtle.digest('SHA-256', data);
  
//     return base64encode(digest);
//   }

// const clientId = '8bd47bc26ab94bb881b0128f77d2ef5b';
// const redirectUri = 'http://localhost:5500';

// let codeVerifier = generateRandomString(128);

// generateCodeChallenge(codeVerifier).then(codeChallenge => {
//   let state = generateRandomString(16);
//   let scope = 'user-read-private user-read-email';

//   localStorage.setItem('code_verifier', codeVerifier);

//   let args = new URLSearchParams({
//     response_type: 'code',
//     client_id: clientId,
//     scope: scope,
//     redirect_uri: redirectUri,
//     state: state,
//     code_challenge_method: 'S256',
//     code_challenge: codeChallenge
//   });

//   window.location = 'https://accounts.spotify.com/authorize?' + args;
// });

// const urlParams = new URLSearchParams(window.location.search);
// let code = urlParams.get('code');

let scores = JSON.parse(localStorage.getItem('bestScores')) || [];
let gameOverTime;
let gamerName;
let score;

function getName(id) {
    gamerName = document.getElementById(id).value;
    if (gamerName.trim() !== "") savePlayerInformation();
}

function savePlayerInformation() {
    let party = {};
    party["name"] = gamerName;
    party["score"] = score;
    party["time"] = gameOverTime;
    scores.push(party);
    scores.sort((a, b) => b.score - a.score);
    const maxScoresToKeep = 10;
    scores = scores.slice(0, maxScoresToKeep);
    localStorage.setItem('bestScores', JSON.stringify(scores));
    console.log(scores);
}

