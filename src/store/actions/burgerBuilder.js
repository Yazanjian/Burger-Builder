import * as actionTypes from './actionTypes';
import axios from '../../axios-orders';

export const addIngredient = (ingName,price) => {
    return{
        type:actionTypes.ADD_INGREDIENT,
        ingredientName : ingName,
        price:price

    }
}


export const removeIngredient = (ingName,price) => {
    return{
        type:actionTypes.REMOVE_INGREDIENT,
        ingredientName : ingName,
        price:price

    }
}

export const setIngredients = (ingredients) =>{
    return{
        type:actionTypes.SET_INGREDIENTS,
        ingredients:ingredients
    };
};

export const initIngredients = () => {
    return dispatch =>{
        axios.get("ingredients.json")
        .then(Response => {
            dispatch(setIngredients(Response.data))
        })
        .catch(error => {
            console.log(error);
        })
    };
};




