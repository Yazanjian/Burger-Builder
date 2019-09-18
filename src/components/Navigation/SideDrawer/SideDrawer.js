import React from 'react';
import NavigationItems from '../NavigationItems/NavigationItems';
import Logo from '../../Logo/logo';
import styles from './SideDrawer.module.css'
import Backdrop from '../../UI/backdrop/backdrop';
import Aux from '../../../hoc/Auxiliary/Auxiliary';

const sideDrawer = (props) => {
    let styleClasses = [styles.SideDrawer, styles.Close];
    // console.log(styleClasses.join(' '))
    if(props.show){
        styleClasses = [styles.SideDrawer, styles.Open];        
    }
    else{
        styleClasses = [styles.SideDrawer, styles.Close];
    }
    // console.log(styleClasses.join(' '))
    return(
        <Aux>
            <Backdrop BackdropClicked={props.BackdropClicked}/>
            <div className={styleClasses.join(' ')}>        
                <Logo height="11%"/>
                <nav>
                    <NavigationItems isAuth={props.isAuth}/>
                </nav>
            </div>
        </Aux>
    );
}

export default sideDrawer;