import React, {Component} from 'react';
import { connect } from 'react-redux';
import { Redirect} from 'react-router-dom';

import Aux from '../../hoc/Auxiliary/Auxiliary';
import Burger from '../../components/Burger/Burger';
import BuildControls from '../../components/Burger/BuildControls/BuildControls';
import ToProvide from '../../context/toProvide';
import Modal from '../../components/UI/modal/modal';
import OrderSummary from '../../components/Burger/OrderSummary/OrderSummary'
import Spinner from '../../components/UI/spinner/spinner';
import * as actionTypes from '../../store/actions/actionTypes';
import * as burgerBuilderActions from '../../store/actions/index';
import Axios from 'axios';


class BurgerBuilder extends Component {
    state = {
        showModal: false,
        loading:false
    }

    componentDidMount () {
        this.props.initIngredients()

        Axios.post('https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyDmvciQVB6hI-NGRQzmXFPHvC4iZ6ZZCI4', {
            email: 'test1@test.com',
            password: '123456',
            returnSecureToken: true
        })
        .then(response=>{
            return Axios.post('https://identitytoolkit.googleapis.com/v1/accounts:lookup?key=AIzaSyDmvciQVB6hI-NGRQzmXFPHvC4iZ6ZZCI4'
            , {
    
                idToken: response.data.idToken
            })
            // console.log(response)
        }).then((res)=>{
            console.log(res)
        })
        .catch(err=>{
            console.log(err)
        })
        

        
        // Axios.post('https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyDmvciQVB6hI-NGRQzmXFPHvC4iZ6ZZCI4', {
        //     email: 'test1@test.com',
        //     password: '123456',
        //     role: ['CUD_Order'],
        //     name: 'TEST',
        //     gender: 'Male'
        // })
        // .then(response=>{
        //     console.log(response)
        // }).catch(err=>{
        //     console.log(err)
        // })
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
        if(this.props.isAuthenticated){
            this.setState({
                showModal : true
            })
        }
        else{
            this.props.history.push({
                pathname:'/Auth',
                state:{prevPath: '/'}
            })
        }
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
        console.log(this.props.token);
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
                <>
                <Burger  ingredients={this.props.ing}/>
                <ToProvide.Provider value={{
                    added:(type) => this.props.addIngredient(type, this.props.price),
                    removed: (type) => this.props.removeIngredient(type, this.props.price),
                    disabledButton:disabledControls,
                    }}>                
                    <BuildControls  price={this.props.price} 
                    purchasable={this.props.purchasable} 
                    orderNowClicked={this.showModalHandler}
                    isAuth={this.props.isAuthenticated}/>                
                </ToProvide.Provider>
                </>    
            )
        }
        
        return(
            <Aux>
                {modal}
                {burger}
                
            </Aux>
        );        
    }
}


const mapStateToProps = state => {
    return{
        ing: state.burgerBuilder.ingredients,
        price: state.burgerBuilder.totalPrice,
        purchasable : state.burgerBuilder.purchasable,
        isAuthenticated: state.Auth.token !== null,
        token: state.Auth.token
    }
};

const mapDispatchToProps = dispatch => {
    return{
        addIngredient: (ingName,price) => dispatch(burgerBuilderActions.addIngredient(ingName,price)),
        removeIngredient: (ingName, price) => dispatch(burgerBuilderActions.removeIngredient(ingName,price)),
        initIngredients: () => dispatch(burgerBuilderActions.initIngredients())
    }
}

export default connect(mapStateToProps,mapDispatchToProps)(BurgerBuilder);