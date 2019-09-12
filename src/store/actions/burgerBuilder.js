import * as actionTypes from './actionTypes';

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
