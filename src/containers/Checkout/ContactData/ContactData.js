import React , {Component} from 'react';

import styles from './ContactData.module.css';
import Button from '../../../components/UI/button/button';
import axios from '../../../axios-orders';
import Spinner from '../../../components/UI/spinner/spinner';
class ContactData extends Component { 
    
    state = {
        name:' ', 
        email:' ',
        address: {
            street : ' ', 
            postalCode: ' '
        },
        loading:false
    }

    handleSubmition = (event) => {
        event.preventDefault();
        
        this.setState({loading:true});
        const order={
            ingredients: this.props.ingredients,
            price: this.props.price,
            customer:{
                name: "Yazan",
                address:{
                    street:"USA street",
                    zipCode:'1243',
                    country:"Palestine"
                },
                email:"test@test.com"
            },
            deliveryMethod:'fastest'
            }
        axios.post('/orders.json',order)
        .then(Response => {
            this.setState({loading:false});
            this.props.history.push('/');
        })
        .catch(error => {
            this.setState({loading:false});
        })
    }

    render(){
        let form = (this.state.loading ? <Spinner /> :
                 <form>
                    <input className={styles.Input} type="text" name="name" placeholder="Enter your name" />
                    <input className={styles.Input} type="email" name="email" placeholder="Enter your email" />
                    <input className={styles.Input} type="text" name="street" placeholder="Street Name" />                    
                    <input className={styles.Input} type="text" name="postal" placeholder="Postal Code" />
                    <Button btnType="Success" clicked={this.handleSubmition}> ORDER </Button>
                </form>)
        return(
            <div className={styles.ContactData}>
                <h4>Enter your contact data</h4>
                {form}
            </div>
        );
    }
}

export default ContactData;