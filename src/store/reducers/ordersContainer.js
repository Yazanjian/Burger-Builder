import * as actionTypes from '../actions/actionTypes';


const initialState = {
    orders: [], 
    loading:true
};

const reducer = (state = initialState, action ) => {

    switch (action.type) {
        case actionTypes.GET_ORDERS:
            return{
                ...state,
                loading:false,
                orders: action.orders
            }

        case actionTypes.GET_ORDERS_ERROR:
            return{
                ...state,
                loading:true,
            }
        default:
            return state;
    }
}


export default reducer;