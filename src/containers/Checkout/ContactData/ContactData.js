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
                    type:'email',
                    placeholder:'Your Email'
                },
                value:''
            },
            deliveryMethod: { 
                elementType:"select",
                elementConfig:{
                    options:[
                        {value:'fastest', displayValue:"Fastest"},
                        {value:'cheapest', displayValue:"Cheapest"}]
                },
                value:''
            }
        },
        loading:false
    }
//hello
    handleSubmition = (event) => {
        event.preventDefault();
        
        this.setState({loading:true});
        const contactData = {}; 
        for(let key in this.state.orderForm){
            contactData[key] = this.state.orderForm[key].value;
        }
        const order={
            ingredients: this.props.ingredients,
            price: this.props.price,
            contactData:contactData
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

    inputChangeHandler = (event,key) => {
        let updatedOrderForm = {...this.state.orderForm};
        let updatedOrderFormElement = {...updatedOrderForm[key]};

        updatedOrderFormElement.value = event.target.value;
        updatedOrderForm[key] = updatedOrderFormElement;
        this.setState({orderForm:updatedOrderForm});
    }

    render(){
        const formArray = [];
        for(let key in this.state.orderForm){
            formArray.push({
                id:key,
                config:this.state.orderForm[key]
            })
        };


        let form = (this.state.loading ? <Spinner /> :
                 <form onSubmit={this.handleSubmition}>
                    {formArray.map(configElement => {
                        return <Input 
                            key={configElement.id}
                            elementType={configElement.config.elementType}
                            elementConfig={configElement.config.elementConfig}
                            value={configElement.config.value}
                            change={(event) => this.inputChangeHandler(event, configElement.id)}/> 
                        })}
                    <Button btnType="Success"> ORDER </Button>
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