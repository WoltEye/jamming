import './App.css';
import React, { useState, useEffect } from 'react';
import { useMediaQuery } from 'react-responsive'
import SearchBar from './components/SearchBar.jsx';
import SearchResults from './components/SearchResults.jsx';
import Playlist from './components/Playlist.jsx';
import Cookies from './components/Cookies.jsx';
import { search, getTrack, createPlaylist, expiresIn } from './util/Spotify.js';

function App() {
    const [ searchTerm, setSearchTerm ] = useState('');
    const [ searchResults, setSearchResults ] = useState([]);
    const [ addedTracks, setAddedTracks ] = useState([]);
    const [ playlistTitle, setPlaylistTitle ] = useState('New Playlist');
    const [ popupState, setPopupState ] = useState(false);
    //Screen sizes
    const isMobileBig = useMediaQuery({ query: '(max-width:850px) and (min-width:701px' });
    const isMobileMedium = useMediaQuery({ query: '(max-width:700px)' });
    const isMobileSmall = useMediaQuery({query: '(max-width: 540px)'})

    useEffect(() => {
      if(document.cookie) {
        console.info('Cookies Enabled');
        setPopupState(true);
        expiresIn(); 
      }
    }, [popupState]);

    const onDecline = () => {
      setPopupState(true);
    }
    const onAccept = () => {
      setPopupState(true);
      document.cookie = 'cookies=enabled'    
    }
    const onSearch = async () => {
      setSearchResults(await search(searchTerm));
    }
    const onChange = (e) => {
      setSearchTerm(e.target.value);
    }
    const onTitleChange = (e) => {
      setPlaylistTitle(e.target.value);
    }
    const onAdd = async e => {
      const addedItem = await getTrack(e.target.dataset.value);
      const id = e.target.dataset.value;
      setSearchResults(oldValues => {
        return oldValues.filter(result => {
          return result.id !== id;
        });   
      });
      setAddedTracks([...addedTracks, addedItem]);
    }
    const onRemove = async (e) => {
      const id = e.target.dataset.value;
      const track = await getTrack(e.target.dataset.value);
      setAddedTracks(oldValues => {
        return oldValues.filter(result => {
          return result.id !== id;
        });   
      });
      setSearchResults([track, ...searchResults]);
    }
    const onSave = async () => {
      if(addedTracks.length > 0) {
      const tracksArray = addedTracks.map((track) => {
       return `spotify:track:${track.id}`;
      });
      playlistTitle ? createPlaylist(playlistTitle,tracksArray)
      : createPlaylist('New Playlist', tracksArray);
    } 
    else {
      window.alert('No tracks in playlist');  
    }
    }
 return (
 <>
{ popupState ? (
<>
<h1>Jamming</h1>
 <div className="content-container"
 style={isMobileBig ? { width: '80%' } : isMobileSmall ? {padding: '2rem 1rem'} : {width: '100%', padding: '4rem'}}>
   <div className="flex-container"
   style={isMobileMedium ? { flexDirection: 'column', alignItems: 'center' } : { flexDirection: 'row' }}>
     <div className="search-container"
     style={isMobileMedium ? {marginRight: '0', marginBottom: '2rem'} : {marginRight: '2rem'}}>
       <SearchBar onSearch={onSearch} onChange={onChange}/>
       <SearchResults results={searchResults} onAdd={onAdd}/>
     </div>
     <Playlist 
     playlistTracks={addedTracks} 
     onSave={onSave} 
     onTitleChange={onTitleChange}
     onRemove={onRemove}/>
     </div>
 </div> </>) : 
 (
 <Cookies
  onAccept={onAccept}
  onDecline={onDecline}/>
 )}
 </>
 );
}

export default App;
