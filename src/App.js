import Layout from './components/Layout/Layout';
import React, {Component} from 'react';
import {Route} from 'react-router-dom';

import BurgerBuilder from './containers/BurgerBuilder/BurgerBuilder';
import Checkout from './containers/Checkout/Checkout';
import Orders from './containers/Orders/Orders';
import Auth from './containers/Auth/Auth';
import Logout from './containers/Auth/logout/logout';
class App extends Component {
  render(){
    return (
      <div>
        <Layout>
          <Route path="/Checkout"  component={Checkout} />
          <Route path="/Auth" component={Auth} />
          <Route path="/logout" component={Logout} />
          <Route path="/orders" exact component={Orders} />
          <Route path="/" exact component={BurgerBuilder} />
        </Layout>
      </div>
    );
  }
}
 
export default App;
