import React from 'react';
import './styles/Track.css';

function Track(props) {
  return (
    <li 
    onClick={props.onRemove ? props.onRemove : props.onAdd}  
    data-value={props.trackId}>
      <h3 
      data-value={props.trackId}>
        {props.trackTitle}
      </h3>
      <p data-value={props.trackId}>
        {props.trackArtist}
        </p>
      <p 
      data-value={props.trackId} 
      data-index={props.index}>
        {props.trackAlbum}
      </p>    
    </li>
  );
}

export default Track;