import * as actionTypes from '../actions/actionTypes';


const INGREDIENTS_PRICES = {
    salad:0.3,
    bacon:0.7,
    cheese:0.5,
    meat:1.3
}

        
const initialState = {
    ingredients: {
        salad:0,
        bacon:0,
        cheese:0,
        meat:0
    }, 
    totalPrice: 4,
    purchasable:false,
};

const reducer = (state = initialState, action ) => {
    switch (action.type) {
        case actionTypes.ADD_INGREDIENT:
        {
            return{
                ...state, 
                ingredients: {
                    ...state.ingredients,
                    [action.ingredientName] : state.ingredients[action.ingredientName] + 1
                },
                totalPrice:action.price + INGREDIENTS_PRICES[action.ingredientName],
                purchasable:true
            }
        }   
        case actionTypes.REMOVE_INGREDIENT:
        {       
            //this code is used to change the pusrhchasable , I didn't write it directly in the state becuase the state doesn't change directly
            let ingredientsArray = []; 
            let purchasable =false; 
            for(let key in state.ingredients){                
                ingredientsArray.push({key:key , value: state.ingredients[key]});
            }

            if( state.ingredients[action.ingredientName] === 1) {
                ingredientsArray.map(ingredient => {
                    if(ingredient.key != action.ingredientName) {
                        if(ingredient.value) purchasable=true
                    }
                })    
            }
            
            return{
                ...state, 
                ingredients: {
                    ...state.ingredients,
                    [action.ingredientName] : state.ingredients[action.ingredientName] - 1
                },
                totalPrice:action.price - INGREDIENTS_PRICES[action.ingredientName],
                purchasable : purchasable 
            }
        }
        case actionTypes.SET_INGREDIENTS:
        {
            return{
                ...state, 
                ingredients: action.ingredients,
                totalPrice:4,
                purchasable:false
            }
        }   
        default:
            return state;
    }
};

export default reducer;