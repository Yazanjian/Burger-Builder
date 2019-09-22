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
        this.props.history.replace('/Checkout/contact-data');
        // console.log(this.state)
    }

    componentDidMount(){
        // const query = new URLSearchParams(this.props.location.search);
        // const ingredients = {};
        // for(let param of query.entries()){
        //     // [prop, value]
        //     console.log(param)
        //     ingredients[param[0]] = +param[1];
        // } 
        // this.setState({ingredients:ingredients});
        // console.log(this.state.ingredients)
       
       
        try{
            this.setState({ingredients:this.props.location.state.ingredients, 
            price:this.props.location.state.price})
        }
        catch (e) {

        }
    }

    render(){
        // console.log(this.props.match.path)
        return(
            <div>
                <CheckoutSummary
                 ingredients={this.state.ingredients}
                 cancelCheckoutSummary={this.cancelCheckoutSummary}
                 continueCheckOutSummary={this.continueCheckOutSummary} />
                 <Route path={ this.props.match.path +  '/contact-data'} 
                 render={(props) => (<ContactData ingredients={this.state.ingredients} price={this.state.price} {...props}/>)} />
            </div>
        )
    }
}

export default Checkout;
