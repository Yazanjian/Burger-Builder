import React from 'react';
import Aux from '../../hoc/Aux';
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
            sideDrawer = (<SideDrawer BackdropClicked={this.BackdropClickedHandler} show={this.state.showSideBar}/>)
        }
        return(
            <Aux>
                <Toolbar  menuClicked={this.menuClickedHandler} />
                {sideDrawer}
                <main className={styles.container}>
                    {this.props.children}
                </main>
            </Aux>
        )
    }
    
};

export default Layout;
