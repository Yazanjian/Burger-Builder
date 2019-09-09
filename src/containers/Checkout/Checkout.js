import React, {Component} from 'react';
import {Route} from 'react-router-dom';

import CheckoutSummary from '../../components/Order/CheckoutSummary/CheckoutSummary';
import ContactData from './ContactData/ContactData';
class Checkout extends Component {
    state = {
        ingredients:{
            salad:1,
            bacon:1,
            cheese:1,
            meat:1
        }
    }

    cancelCheckoutSummary = () => {
        this.props.history.goBack();
    }

    continueCheckOutSummary = () => {
        this.props.history.replace('/Checkout/contact-data')
    }
//this.props.location.data
    render(){
        console.log(this.props.match.path)
        return(
            <div>
                <CheckoutSummary
                 ingredients={this.state.ingredients}
                 cancelCheckoutSummary={this.cancelCheckoutSummary}
                 continueCheckOutSummary={this.continueCheckOutSummary} />
                 {/* <ContactData /> */}
                 <Route path={ this.props.match.path +  '/contact-data'} component={ContactData} />
            </div>
        )
    }
}

export default Checkout;
