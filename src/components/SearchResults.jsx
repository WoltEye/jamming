import React from 'react';
import Track from './Track';

function SearchResults(props) {
    return (
    <ul>
    { props.results ? props.results.map((track, index) => <Track 
    trackTitle={track.name}
    trackArtist= 
    {
      track.artists.length > 1 ? track.artists.map((artist, index) => {
      return index === track.artists.length - 1 ? artist.name : artist.name + ', ';
    }) : track.artists[0].name 
}    
    trackAlbum={track.album.name}
    trackPreview={track.preview_url}
    trackId={track.id}
    onAdd={props.onAdd}
    key={index} />
    ) : <li></li> }
    </ul>
  );
}


export default SearchResults;