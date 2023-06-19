import React from 'react';
import './styles/Playlist.css';
import Track from './Track';

function Playlist(props) {
  return (
    <div className="playlist-container">
      <input 
      type="text" 
      id="playlist-title" 
      placeholder="New Playlist"
      onChange={props.onTitleChange}></input>
      <ul>
        { props.playlistTracks && props.playlistTracks.map((track, index) => 
        <Track trackTitle={track.name}
        trackArtist= 
      {
        track.artists.length > 1 ? track.artists.map((artist, index) => {
        return index === track.artists.length - 1 ? artist.name : artist.name + ', ';
      }) : track.artists[0].name 
}        trackAlbum={track.album.name}
        trackId={track.id}
        trackPreview={track.preview_url}
        key={index}
        onRemove={props.onRemove}/>) }
      </ul>
      <button onClick={props.onSave}>Save Playlist</button>
    </div>
  );
}

export default Playlist;