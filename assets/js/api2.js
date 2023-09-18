const clientId = "8bd47bc26ab94bb881b0128f77d2ef5b";
const verifier = generateCodeVerifier(128);

console.log('api2.js run');

async function getAccessToken(clientId, code) {
    const verifier = localStorage.getItem("verifier");
    
    const params = new URLSearchParams();
    params.append("client_id", clientId);
    params.append("grant_type", "authorization_code");
    params.append("code", code);
    params.append("redirect_uri", "http://localhost:5500");
    params.append("code_verifier", verifier);
    console.log('params : ', params);
    
    const result = await fetch("https://accounts.spotify.com/api/token", {
        method: "POST",
        headers: { "Content-Type": "application/x-www-form-urlencoded" },
        body: params
    });
    // const code = params.get("code");
    
    const { access_token } = await result.json();
    console.log('access token : ', access_token);
    return access_token;
}

function generateCodeVerifier(length) {
    let text = '';
    let possible = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    
    for (let i = 0; i < length; i++) {
        text += possible.charAt(Math.floor(Math.random() * possible.length));
    }
    return text;
}

async function redirectToAuthCodeFlow(clientId) {
    const verifier = generateCodeVerifier(128);
    console.log('verifier : ', verifier);
    const challenge = await generateCodeChallenge(verifier);
    console.log('challenge : ', challenge);

    localStorage.setItem("verifier", verifier);

    const params = new URLSearchParams();
    params.append("client_id", clientId);
    params.append("response_type", "code");
    params.append("redirect_uri", "http://localhost:5500");
    params.append("scope", "user-read-private user-read-email");
    params.append("code_challenge_method", "S256");
    params.append("code_challenge", challenge);

    document.location = `https://accounts.spotify.com/authorize?${params.toString()}`;
}

redirectToAuthCodeFlow(clientId);
getAccessToken(clientId, code);