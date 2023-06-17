import React from 'react';
import './styles/SearchBar.css';

function SearchBar(props) {
  return (
    <>
    <label htmlFor="search"><h2>Search</h2></label>
    <input type="text" id="search" onChange={props.onChange}/>
    <button onClick={props.onSearch}>Search</button>
     </>  
    )    
}

export default SearchBar;