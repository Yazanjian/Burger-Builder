import React from 'react';
import './Xcomponent.css';

const Xcomponent = (props) => {
    return(
        <div id="orangeBox">
            <span id="x" onClick={props.xClicked}>X</span>
        </div>
    );
}

export default Xcomponent;