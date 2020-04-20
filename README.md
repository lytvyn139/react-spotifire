# SPOTIFIRE  🔥
# About
Spotifire was build with React & Spotify API. 
I was practicing React components, passing state, API requests.
This app allows user to search for the songs in the entire Spotify library,
create a custom playlists, then save it to their Spotify account.

## Installation
The API Key 🗝️  is not provided !

You have to register on www.spotify.com, then navigate to "https://developer.spotify.com/dashboard", click 'create a client ID', you can name your app as you like. Spotify will give you 32 symbol API Key 🗝️  (Client ID). In the settings, make sure that Redirect URIs is set to http://localhost:3000

## Usage
Download & upack .zip 📦

in the :
\util\Spotify.js  

make sure that redirectURI is set to: what ever you put in you app settings on spotify web site
Replace clientID value with your valid API key 🗝

const redirectURI = 'http://localhost:3000';         
const clientID = 'a23dz................2wfg3'; 

in unpacked directory (where json files is ) open terminal
```bash
npm i
npm start 
```
now SPOTIFIRE 🔥 app running in browser💪

enter song/artist name, click + to add it to playlist
enter playlist name, click 'save' you should see it in your playlists
