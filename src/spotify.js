const request = require("request");
const client_id = process.env.CLIENT_ID;
const client_secret = process.env.CLIENT_SECRET;




async function getAccessToken() {
    const response = await fetch("https://accounts.spotify.com/api/token", {
        method: "POST",
        headers: {
            "Content-Type": "application/x-www-form-urlencoded",
            Authorization: "Basic " + btoa(client_id+ ":" + client_secret),
        },
        body: "grant_type=client_credentials",
    });

    const data = await response.json();
    return data.access_token;
}

async function searchPlaylists(query) {
    const accessToken = await getAccessToken();
    const response = await fetch(`https://api.spotify.com/v1/search?q=${query}&type=playlist`, {
        headers: { Authorization: `Bearer ${accessToken}` },
    });

    const data = await response.json();
    return data.playlists.items; }




module.exports={getAccessToken,searchPlaylists}
