import React, { useState, useRef } from 'react';
import './styles/Track.css';

function Track(props) {
  const [ isPlaying, setIsPlaying ] = useState(false);
  const audioRef = useRef(null);

  const playPreview = () => {
    setIsPlaying(true); 
    audioRef.current.play(); 
  }
  const pausePreview = () => {
    setIsPlaying(false);
    audioRef.current.pause();
  }
  return (
    <div>
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
    { props.trackPreview ? (<button 
    onClick={!isPlaying ? playPreview : pausePreview}>
    { !isPlaying ? 'Play Preview' : 'Pause Preview' }
    </button>) : (<p className="preview-error">No preview available</p>) }
    <audio ref={audioRef} src={props.trackPreview} />
    </div>
  );
}

export default Track;