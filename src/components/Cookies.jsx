import React from 'react';
import './styles/Cookies.css';
import { useMediaQuery } from 'react-responsive';

function Cookies(props) {
  const isMobileSmall = useMediaQuery({query: '(max-width: 430px)'})

  return (
  <div className="cookie-popup">
    <div className="cookie-content-container">
      <h1>Cookies</h1> 
      { isMobileSmall ? <p>This site uses cookies and localstorage to store the
      expiry date of the spotify access token and if the user
      has enabled cookies with this prompt. Not enabling cookies
      may cause the program to break.</p> : 
      <p>This site uses cookies and localstorage to store the <br />
      expiry date of the spotify access token and if the user<br />
      has enabled cookies with this prompt. Not enabling <br />cookies
      may cause the program to break.</p>}
      <button className='cookie-button' 
      onClick={props.onAccept}>
        Accept
      </button>
      <button className='cookie-button'
      onClick={props.onDecline}>
        Decline
      </button>
    </div>
  </div>
  );
}

export default Cookies;