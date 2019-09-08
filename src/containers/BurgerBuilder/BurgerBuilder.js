import React, {Component} from 'react';
import Aux from '../../hoc/Aux';
import Burger from '../../components/Burger/Burger';
import BuildControls from '../../components/Burger/BuildControls/BuildControls';
import ToProvide from '../../context/toProvide';
import Modal from '../../components/UI/modal/modal';
import OrderSummary from '../../components/Burger/OrderSummary/OrderSummary'
import axios from '../../axios-orders';
import Spinner from '../../components/UI/spinner/spinner';

const INGREDIENTS_PRICES = {
    salad:0.3,
    bacon:0.7,
    cheese:0.5,
    meat:1.3
}

class BurgerBuilder extends Component {
    state = {
        ingredients:null,
        totalPrice:4,
        purchasable:false,
        showModal: false,
        loading:false
    }

    componentDidMount () {
        axios.get("ingredients.json")
        .then(Response => {
            this.setState({ingredients:Response.data})
        })
        .catch(error => {
            console.log(error);
        })
    }

    purchasableHandler = (ingredients) => {
        if(ingredients['salad'] || 
            ingredients['bacon'] || 
            ingredients['cheese'] ||
            ingredients['meat'])
            {
                this.setState({purchasable:true});
            }     
        else{
            this.setState({purchasable:false})
        }  
    }

    addIngredientHandler = (type) =>{
        let oldCount = this.state.ingredients[type];
        let newCount = oldCount + 1; 
        let newIngrediets = {...this.state.ingredients};
        newIngrediets[type] = newCount;

        let prevPrice = this.state.totalPrice; 
        let newPrice = prevPrice + INGREDIENTS_PRICES[type];

        this.setState({
            ingredients : newIngrediets,
            totalPrice: newPrice
        })
        this.purchasableHandler(newIngrediets);
    }

    removeIngredientHandler = (type) => {
        let oldCount = this.state.ingredients[type];
        if(oldCount > 0){
            let newCount = oldCount - 1; 
            let newIngrediets = {...this.state.ingredients};
            newIngrediets[type] = newCount;
            
            let prevPrice = this.state.totalPrice;
            let newPrice = prevPrice - INGREDIENTS_PRICES[type];
            this.setState({
                ingredients : newIngrediets,
                totalPrice: newPrice
            })
            this.purchasableHandler(newIngrediets);
        }
        else{
            alert('No ' + type + " to remove!");
        }
    } 

    showModalHandler = () => {
        this.setState({
            showModal : true
        })
    }

    hideModalHandler = () => {
        this.setState({
            showModal : false
        })
    }

    purchasedContinueHandler = () => {
        this.setState({loading:true});
        const order={
            ingredients: this.state.ingredients,
            price: this.state.totalPrice,
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
            this.setState({loading:false,showModal:false});
            // console.log(Response);
        })
        .catch(error => {
            this.setState({loading:false});
            // console.log(error);
        })
    }
        
        // alert('to continue page');
    
    
    render(){       
        const disabledControls = {...this.state.ingredients} ;
        for(let key in disabledControls){
            disabledControls[key] = (disabledControls[key] === 0);
        }

        let modal = null; 
        if(this.state.showModal){
            modal = (
                <Modal xClicked={this.hideModalHandler}>
                    {this.state.loading ? <Spinner /> : <OrderSummary 
                    ingredients={this.state.ingredients}
                    price={this.state.totalPrice}
                    cancelled ={this.hideModalHandler}
                    continue={this.purchasedContinueHandler} />}                    
                </Modal>
            )
        }

        let burger = <Spinner />
        if(this.state.ingredients){
            burger = (
                <Burger  ingredients={this.state.ingredients}/>
            )
        }
        
        return(
            <Aux>
                {modal}
                {burger}
                <ToProvide.Provider value={{
                    added:this.addIngredientHandler,
                    removed:this.removeIngredientHandler,
                    disabledButton:disabledControls,
                    }}>                
                    <BuildControls  price={this.state.totalPrice} 
                    purchasable={this.state.purchasable} 
                    orderNowClicked={this.showModalHandler}/>                
                </ToProvide.Provider>    
            </Aux>
        );        
    }
}

export default BurgerBuilder;