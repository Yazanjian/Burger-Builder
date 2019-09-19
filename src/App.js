import Layout from './components/Layout/Layout';
import React, {Component} from 'react';
import {Route} from 'react-router-dom';
import { connect } from 'react-redux'; 
import { Redirect} from 'react-router-dom';

import BurgerBuilder from './containers/BurgerBuilder/BurgerBuilder';
import Checkout from './containers/Checkout/Checkout';
import Orders from './containers/Orders/Orders';
import Auth from './containers/Auth/Auth';
import Logout from './containers/Auth/logout/logout';
class App extends Component {

  render(){

    let router = (
      <>
        <Route path="/Auth" component={Auth} />
        <Route path="/" exact component={BurgerBuilder} />
        <Redirect to="/" />
      </>
    );

    if(this.props.isAuthenticated){
      router = (
        <>
          <Route path="/Checkout"  component={Checkout} />
          <Route path="/Auth" component={Auth} />
          <Route path="/logout" component={Logout} />
          <Route path="/orders" exact component={Orders} />
          <Route path="/" exact component={BurgerBuilder} />
        </>
      )
    }

    return (
      <div>
        <Layout>
          {router}
        </Layout>
      </div>
    );
  }
}


const mapStateToProps = state => {
  return{
      isAuthenticated: state.Auth.token !== null,
  }
};
 
export default connect(mapStateToProps)(App);
