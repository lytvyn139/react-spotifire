const clientID = "🗝";
const redirectURI = "http://localhost:3000";
let accessToken;

const Spotify = {
  getAccessToken() {
    if (accessToken) {
      return accessToken;
    }
    const accessTokenMatch = window.location.href.match(/access_token=([^&]*)/);
    const expirationTimeMatch = window.location.href.match(/expires_in=([^&]*)/);
    if (accessTokenMatch && expirationTimeMatch) {
      accessToken = accessTokenMatch[1];
      const expirationTime = Number(expirationTimeMatch[1]);
      window.setTimeout(() => (accessToken = ""), expirationTime * 1000);
      window.history.pushState("Access Token", null, "/");
      return accessToken;
    } else {
      const accessUrl = `https://accounts.spotify.com/authorize?client_id=${clientID}&response_type=token&scope=playlist-modify-public&redirect_uri=${redirectURI}`;
      window.location = accessUrl;
    }
  },

  search(SearchFor) {
    accessToken = this.getAccessToken();
    const searchUrl = `https://api.spotify.com/v1/search?type=track&q=${SearchFor}`;
    return fetch(searchUrl, {
        headers: {
          Authorization: `Bearer ${accessToken}`
        },
      })
      .then((response) => {
        return response.json();
      })
      .then((jsonResponse) => {
        if (jsonResponse.tracks) {
          return jsonResponse.tracks.items.map((track) => ({
            id: track.id,
            name: track.name,
            artist: track.artists[0].name,
            album: track.album.name,
            uri: track.uri,
            previewUrl: track.preview_url,
          }));
        } else return [];
      });
  },

  savePlaylist(playlistName, trackURIs) {
    accessToken = this.getAccessToken();
    let headers = {
      Authorization: `Bearer ${accessToken}`
    };
    let userID;
    let playlistID;
    if (playlistName && trackURIs) {
      return fetch("https://api.spotify.com/v1/me", {
          headers: headers
        })
        .then((response) => {
          return response.json();
        })
        .then((jsonResponse) => {
          userID = jsonResponse.id;
        })
        .then(() => {
          return fetch(`https://api.spotify.com/v1/users/${userID}/playlists`, {
            method: "POST",
            headers: headers,
            body: JSON.stringify({
              name: playlistName
            }),
          });
        })
        .then((response) => {
          return response.json();
        })
        .then((jsonResponse) => {
          playlistID = jsonResponse.id;
        })
        .then(() => {
          return fetch(
            `https://api.spotify.com/v1/users/${userID}/playlists/${playlistID}/tracks`, {
              method: "POST",
              headers: headers,
              body: JSON.stringify({
                uris: trackURIs
              }),
            }
          );
        })
        .then((response) => {
          return response.json();
        })
        .then((jsonResponse) => {
          playlistID = jsonResponse.id;
        });
    } else {
      return;
    }
  },
};

export default Spotify;