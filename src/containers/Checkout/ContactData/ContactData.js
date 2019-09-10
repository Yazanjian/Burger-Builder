import React , {Component} from 'react';

import styles from './ContactData.module.css';
import Button from '../../../components/UI/button/button';
import axios from '../../../axios-orders';
import Spinner from '../../../components/UI/spinner/spinner';
import Input from '../../../components/UI/Input/Input';
class ContactData extends Component { 
    
    state = {
        orderForm:{
            name: { 
                elementType:"input",
                elementConfig:{
                    type:'text',
                    placeholder:'Your name'
                },
                value:''
            },
            street: { 
                elementType:"input",
                elementConfig:{
                    type:'text',
                    placeholder:'Street'
                },
                value:''
            },
            zipCode: { 
                elementType:"input",
                elementConfig:{
                    type:'text',
                    placeholder:'ZIP Code'
                },
                value:''
            },
            country: { 
                elementType:"input",
                elementConfig:{
                    type:'text',
                    placeholder:'Country'
                },
                value:''
            },
            email: { 
                elementType:"input",
                elementConfig:{
                    type:'text',
                    placeholder:'Your Email'
                },
                value:''
            },
            deliveryMethod: { 
                elementType:"select",
                elementConfig:{
                    options:[
                        {value:'fastest', displaValue:"Fastest"},
                        {value:'cheapest', displaValue:"Cheapest"}]
                },
                value:''
            }
        },
        loading:false
    }

    handleSubmition = (event) => {
        event.preventDefault();
        
        this.setState({loading:true});
        const order={
            ingredients: this.props.ingredients,
            price: this.props.price,
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
                    <Input inputType="input" name="name" placeholder="Enter your name" />
                    <Input inputType="input" type="email" name="email" placeholder="Enter your email" />
                    <Input inputType="input" type="text" name="street" placeholder="Street Name" />                    
                    <Input inputType="input" type="text" name="postal" placeholder="Postal Code" />
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