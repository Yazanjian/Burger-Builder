import React , {Component} from 'react';
import { connect} from 'react-redux';

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
                value:'',
                // validation : {
                //     required:true
                // },
                // valid:false
            },
            street: { 
                elementType:"input",
                elementConfig:{
                    type:'text',
                    placeholder:'Street'
                },
                value:'',
                // valid:true
            },
            zipCode: { 
                elementType:"input",
                elementConfig:{
                    type:'text',
                    placeholder:'ZIP Code'
                },
                // validation : {
                //     required:true
                // },
                value:'',
                // valid:false
            },
            country: { 
                elementType:"input",
                elementConfig:{
                    type:'text',
                    placeholder:'Country'
                },
                value:'',
                // valid:true
            },
            email: { 
                elementType:"input",
                elementConfig:{
                    type:'email',
                    placeholder:'Your Email'
                },
                value:'',
                // valid:true
            },
            deliveryMethod: { 
                elementType:"select",
                elementConfig:{
                    options:[
                        {value:'fastest', displayValue:"Fastest"},
                        {value:'cheapest', displayValue:"Cheapest"}]
                },
                value:'fastest',
                // valid:true
            }
        },
        loading:false
    }
//hello
    handleSubmition = (event,token) => {
        event.preventDefault();
        
        this.setState({loading:true});
        const contactData = {}; 
        for(let key in this.state.orderForm){
            contactData[key] = this.state.orderForm[key].value;
        }
        const order={
            ingredients: this.props.ingredients,
            price: this.props.price,
            contactData:contactData,
            userId:this.props.userId
            }
        axios.post('/orders.json?auth=' + token,order)
        .then(Response => {
            this.setState({loading:false});
            this.props.history.push('/');
        })
        .catch(error => {
            // console.log(token)
            // console.log(error)
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

    // validityHandler(value, toCheck){
    //     let valid = true;
    //     if(toCheck.required && valid){
    //         valid = value.trim() !== '';
    //     }
    //     return valid;
    // }


    render(){
        const formArray = [];
        for(let key in this.state.orderForm){
            formArray.push({
                id:key,
                config:this.state.orderForm[key]
            })
        };

        // console.log(this.props.token);
        let form = (this.state.loading ? <Spinner /> :
                 <form onSubmit={(event) => this.handleSubmition(event,this.props.token)}>
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

const mapStateToProps = state => {
    return{
        token: state.Auth.token,
        userId:state.Auth.userId
    }
};


export default connect(mapStateToProps)(ContactData);