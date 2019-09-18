import React from 'react';
import {connect} from 'react-redux';

import Aux from '../../hoc/Auxiliary/Auxiliary';
import styles from './Layout.module.css';
import Toolbar from '../Navigation/Toolbar/Toolbar';
import SideDrawer from '../Navigation/SideDrawer/SideDrawer';

class Layout extends React.Component {
    state = {
        showSideBar:false
    }

    BackdropClickedHandler = () => {
        this.setState({showSideBar:false})
    }

    menuClickedHandler = () => {
        this.setState({showSideBar:true})
    }
    render(){
        let sideDrawer = null ;
        if(this.state.showSideBar){
            sideDrawer = (<SideDrawer isAuth={this.props.token} BackdropClicked={this.BackdropClickedHandler} show={this.state.showSideBar}/>)
        }
        return(
            <Aux>
                <Toolbar isAuth={this.props.token}  menuClicked={this.menuClickedHandler} />
                {sideDrawer}
                <main className={styles.container}>
                    {this.props.children}
                </main>
            </Aux>
        )
    }
    
};

const mapStateToProps = state => {
    return{
       token: state.Auth.token ? true : false
    }
};



export default connect(mapStateToProps)(Layout);
