const clientID = '';
const redirect_uri = ''
let accessToken = '';

/* Redirect to spotify authorize page if access token doesnt already exist */
  const requestAccessToken = () => {
  const endPoint = 'https://accounts.spotify.com/authorize'
  const params = `?client_id=${clientID}&response_type=token&redirect_uri=${redirect_uri}&scope=playlist-modify-public`;
  const url = endPoint + params;
  if(window.location.href.includes('#access_token')) {
    const regex = window.location.href.match(/#access_token=([^&]+)/);
    accessToken = regex[1];
  }
  else {
    window.location.href = url;
  }

}

/* The token always expires after 3600seconds. Check first if cookies are enabled if they are
   check if the url has the access token if not the user isnt authorized yet clear the localStorage
   if the user has visited the site previously and left it would stil have the old timer running.
   If the url has the access token assing the access token to the accessToken variable so it
   can be used in spotify api calls. And insert the current time in milliseconds to localstorage
   and every time the spotify api is used check if the access token has expired if it has
   redirect to the home page without the url parameters. (Almost same without cookies just without the timer in localstorage)  */
export const expiresIn = () =>  {
  if(document.cookie) { 
  if(window.location.href.includes('#access_token')) {
      const regex = window.location.href.match(/#access_token=([^&]+)/);
      accessToken = regex[1];
      if(localStorage.length === 0) { 
      localStorage.setItem('start', Date.now()); 
     }
     if(Math.abs(Date.now() - localStorage.getItem('start') >= 3600000)) {
      window.alert('Token Expired');
      localStorage.clear();
      window.location.href = redirect_uri;
     }
    }
  else {
      console.info('localStorage and accessToken cleared. Reason: No url parameters on load')
      accessToken = '';
      localStorage.clear();  
       }
      }
  //If cookies not enabled
  else {
    console.warn('Cookies not enabled cant check if access token has expired');
    if(window.location.href.includes('#access_token')) { 
      const regex = window.location.href.match(/#access_token=([^&]+)/);
      accessToken = regex[1]; 
    }
    else {
      console.info('localStorage and accessToken cleared. Reason: No url parameters on load')
      accessToken = '';
      localStorage.clear();   
    }  
  }
  }

  export const requestUserId = async () => {
    expiresIn();
    if(accessToken) {
      const endPoint = 'https://api.spotify.com/v1/me';
      const params = `?access_token=${accessToken}`;
      const url = endPoint + params;
      try {
        const response = await fetch(url);
        if(response.ok) {
          const jsonResponse = await response.json();
          return jsonResponse.id;  
        }
      }
      catch(e) {
        console.error(e);  
      }
    } 
  }

export const search = async (searchTerm) => {
  expiresIn();
  if(accessToken) {
  const endPoint = 'https://api.spotify.com/v1/search';
  const params = `?q=${searchTerm}&type=track&access_token=${accessToken}`;
  const url = endPoint + params;
  try {
    const result = await fetch(url);
    if(result.ok) {
      const jsonResult = await result.json();
      return jsonResult.tracks.items;
    }
  }
  catch(e) {
    console.error(e);
  }
}
  requestAccessToken();
}

export const getTrack = async (id) => {
  expiresIn();
  if(accessToken) {
    const url = 'https://api.spotify.com/v1/tracks/' + id + `?access_token=${accessToken}`;
    try {
      const response = await fetch(url);
      if(response.ok) {
        const jsonResponse = await response.json(); 
        return jsonResponse; 
      } else {
      console.error('Network Error'); 
    }
    }
    catch(e) {
      throw new Error(e);
    }  
  }
  requestAccessToken();  
}

export const createPlaylist = async (playlistName,tracks) => {
  expiresIn();
  if(accessToken) {
    console.log(tracks);
    const userId = await requestUserId();
    const endpoint = `https://api.spotify.com/v1/users/${userId}/playlists`;
    const params = `?access_token=${accessToken}`;
    const firstUrl = endpoint + params;
    let playlistId;
    try {
      const response = await fetch(firstUrl, 
      {
        method: "POST",
        cache: "no-cache",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          name: playlistName,
          public: true
        })
      });
      if(response.ok) {
       const jsonResponse = await response.json();
       playlistId = jsonResponse.id;
       const secondUrl = `https://api.spotify.com/v1/playlists/${playlistId}/tracks` + params;
       const secondResponse = await fetch(secondUrl, {
         method: "POST",
         cache: "no-cache",
         headers: {
          "Content-Type": "application/json"
         },
         body: JSON.stringify({
          uris: tracks
         })
       });
       if(secondResponse.ok) {
          console.info('Playlist creation should be successfull');
          return;
       }
      }
    }
    catch(e) {
      console.error(e);
    }
  }     
}