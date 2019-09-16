import React, {Component} from 'react';
import { connect } from 'react-redux';

import Aux from '../../hoc/Auxiliary/Auxiliary';
import Burger from '../../components/Burger/Burger';
import BuildControls from '../../components/Burger/BuildControls/BuildControls';
import ToProvide from '../../context/toProvide';
import Modal from '../../components/UI/modal/modal';
import OrderSummary from '../../components/Burger/OrderSummary/OrderSummary'
import Spinner from '../../components/UI/spinner/spinner';
import * as actionTypes from '../../store/actions/actionTypes';
import * as burgerBuilderActions from '../../store/actions/index';


class BurgerBuilder extends Component {
    state = {
        // ingredients:null,
        // totalPrice:4,
        // purchasable:false,
        showModal: false,
        loading:false
    }

    componentDidMount () {
        
    }

    // purchasableHandler = (ingredients) => {
    //     if(ingredients['salad'] || 
    //         ingredients['bacon'] || 
    //         ingredients['cheese'] ||
    //         ingredients['meat'])
    //         {
    //             this.setState({purchasable:true});
    //         }     
    //     else{
    //         this.setState({purchasable:false})
    //     }  
    // }

    // addIngredientHandler = (type) =>{
    //     let oldCount = this.state.ingredients[type];
    //     let newCount = oldCount + 1; 
    //     let newIngrediets = {...this.state.ingredients};
    //     newIngrediets[type] = newCount;

    //     let prevPrice = this.state.totalPrice; 
    //     let newPrice = prevPrice + INGREDIENTS_PRICES[type];

    //     this.setState({
    //         ingredients : newIngrediets,
    //         totalPrice: newPrice
    //     })
    //     this.purchasableHandler(newIngrediets);
    // }

    // removeIngredientHandler = (type) => {
    //     let oldCount = this.state.ingredients[type];
    //     if(oldCount > 0){
    //         let newCount = oldCount - 1; 
    //         let newIngrediets = {...this.state.ingredients};
    //         newIngrediets[type] = newCount;
            
    //         let prevPrice = this.state.totalPrice;
    //         let newPrice = prevPrice - INGREDIENTS_PRICES[type];
    //         this.setState({
    //             ingredients : newIngrediets,
    //             totalPrice: newPrice
    //         })
    //         this.purchasableHandler(newIngrediets);
    //     }
    //     else{
    //         alert('No ' + type + " to remove!");
    //     }
    // } 

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
        // this.setState({loading:true});
        // const order={
        //     ingredients: this.state.ingredients,
        //     price: this.state.totalPrice,
        //     customer:{
        //         name: "Yazan",
        //         address:{
        //             street:"USA street",
        //             zipCode:'1243',
        //             country:"Palestine"
        //         },
        //         email:"test@test.com"
        //     },
        //     deliveryMethod:'fastest'
        //     }
        // axios.post('/orders.json',order)
        // .then(Response => {
        //     this.setState({loading:false,showModal:false});
        // })
        // .catch(error => {
        //     this.setState({loading:false});
        // })

        const queryParams = []; 
        for(let i in this.props.ing){
            queryParams.push(encodeURIComponent(i) + '=' + encodeURIComponent(this.props.ing[i]));
        }
        const queryString = queryParams.join('&');
        this.props.history.push({
            pathname: '/Checkout',
            state:{ingredients:this.props.ing , price:this.props.price}
            // search: '?' + queryString
            // state:undefined, 
            // data: this.state.ingredients
        });
    }
        
    
    
    render(){       
        const disabledControls = {...this.props.ing} ;
        for(let key in disabledControls){
            disabledControls[key] = (disabledControls[key] === 0);
        }

        let modal = null; 
        if(this.state.showModal){
            modal = (
                <Modal xClicked={this.hideModalHandler}>
                    {this.state.loading ? <Spinner /> : <OrderSummary 
                    ingredients={this.props.ing}
                    price={this.props.price}
                    cancelled ={this.hideModalHandler}
                    continue={this.purchasedContinueHandler} />}                    
                </Modal>
            )
        }

        let burger = <Spinner />
        if(this.props.ing){
            burger = (
                <Burger  ingredients={this.props.ing}/>
            )
        }
        
        return(
            <Aux>
                {modal}
                {burger}
                <ToProvide.Provider value={{
                    added:(type) => this.props.addIngredient(type, this.props.price),
                    removed: (type) => this.props.removeIngredient(type, this.props.price),
                    disabledButton:disabledControls,
                    }}>                
                    <BuildControls  price={this.props.price} 
                    purchasable={this.props.purchasable} 
                    orderNowClicked={this.showModalHandler}/>                
                </ToProvide.Provider>    
            </Aux>
        );        
    }
}


const mapStateToProps = state => {
    return{
        ing: state.ingredients,
        price: state.totalPrice,
        purchasable : state.purchasable
    }
};

const mapDispatchToProps = dispatch => {
    return{
        addIngredient: (ingName,price) => dispatch(burgerBuilderActions.addIngredient(ingName,price)),
        removeIngredient: (ingName, price) => dispatch(burgerBuilderActions.removeIngredient(ingName,price))
    }
}

export default connect(mapStateToProps,mapDispatchToProps)(BurgerBuilder);