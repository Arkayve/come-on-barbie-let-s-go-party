// The code verifier will be generated using the following JavaScript function:
function generateRandomString(length) {
    let text = '';
    let possible = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  
    for (let i = 0; i < length; i++) {
      text += possible.charAt(Math.floor(Math.random() * possible.length));
    }
    return text;
  }
  
//   Once the code verifier has been generated, we must transform (hash) it using the SHA256 algorithm. This is the value that will be sent within the user authorization request.

// The generateCodeChallenge function returns the base64 representation of the digest by calling to base64encode():
async function generateCodeChallenge(codeVerifier) {
    function base64encode(string) {
      return btoa(String.fromCharCode.apply(null, new Uint8Array(string)))
        .replace(/\+/g, '-')
        .replace(/\//g, '_')
        .replace(/=+$/, '');
    }
  
    const encoder = new TextEncoder();
    const data = encoder.encode(codeVerifier);
    const digest = await window.crypto.subtle.digest('SHA-256', data);
  
    return base64encode(digest);
  }

//   The code to request the user authorization looks like this:
// const clientId = localStorage.getItem('spotifyClientId');
const clientId = '8bd47bc26ab94bb881b0128f77d2ef5b';
const redirectUri = 'http://localhost:5500';

let codeVerifier = generateRandomString(128);

generateCodeChallenge(codeVerifier).then(codeChallenge => {
  let state = generateRandomString(16);
  let scope = 'user-read-private user-read-email';

  localStorage.setItem('code_verifier', codeVerifier);

  let args = new URLSearchParams({
    response_type: 'code',
    client_id: clientId,
    scope: scope,
    redirect_uri: redirectUri,
    state: state,
    code_challenge_method: 'S256',
    code_challenge: codeChallenge
  });

  window.location = 'https://accounts.spotify.com/authorize?' + args;
});

// We must parse the URL and save the code parameter to request the access token afterwards:
const urlParams = new URLSearchParams(window.location.search);
let code = urlParams.get('code');


// The body of the request can be implemented as follows:
// let codeVerifier = localStorage.getItem('code_verifier');
// ERROR : Uncaught SyntaxError: Identifier 'codeVerifier' has already been declared (at api2.js:64:5)

let body = new URLSearchParams({
  grant_type: 'authorization_code',
  code: code,
  redirect_uri: redirectUri,
  client_id: clientId,
  code_verifier: codeVerifier
});

// Finally, we can make the POST request and store the access token by parsing the JSON response from the server:
const response = fetch('https://accounts.spotify.com/api/token', {
  method: 'POST',
  headers: {
    'Content-Type': 'application/x-www-form-urlencoded'
  },
  body: body
})
  .then(response => {
    if (!response.ok) {
      throw new Error('HTTP status ' + response.status);
    }
    console.log(response.json());
    return response.json();
  })
  .then(data => {
    localStorage.setItem('access_token', data.access_token);
  })
  .catch(error => {
    console.error('Error:', error);
  });

//   The following code implements the getProfile() function which performs the API call to the /me endpoint in order to retrieve the user profile related information:
async function getProfile(accessToken) {
    // let accessToken = localStorage.getItem('access_token');
    // ERROR : Uncaught SyntaxError: Identifier 'accessToken' has already been declared (at api2.js:98:9)
    accessToken = localStorage.getItem('access_token');
    const response = await fetch('https://api.spotify.com/v1/me', {
      headers: {
        Authorization: 'Bearer ' + accessToken
      }
    });
  
    const data = await response.json();
    console.log(data);
  }


//   In order to refresh the token, a POST request must be sent with the following body parameters encoded in application/x-www-form-urlencoded:

// REQUEST BODY PARAMETER --VALUE
// grant_type --Required Set it to refresh_token.
// refresh_token --Required The refresh token returned from the authorization code exchange.
// client_id --Required The client ID for your app, available from the developer dashboard.
// The headers of this POST request must contain the Content-Type header set to application/x-www-form-urlencoded value.