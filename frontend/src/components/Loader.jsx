// Description: This component is used to display a loading animation while the app is fetching data from the server.
import React from 'react';
import '../styles/loader.css';
//Loader is a function that returns a loading animation
function Loader() {
    return (
        <div className="container">
            <div className="cloud front">
                <span className="left-front"></span>
                <span className="right-front"></span>
            </div>
            <span className="sun sunshine"></span>
            <span className="sun"></span>
            <div className="cloud back">
                <span className="left-back"></span>
                <span className="right-back"></span>
            </div>
        </div>
    );
}

export default Loader;