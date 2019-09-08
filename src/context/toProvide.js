import React from 'react';

const toProvide = React.createContext({
    added : () => {}, 
    removed: () => {},
    disabledButton : {},
})


export default toProvide;