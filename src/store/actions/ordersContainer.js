import * as actionTypes from './actionTypes';
import axios from '../../axios-orders';

const getOrders = (orders) => {
    console.log(orders)
    return{
        type: actionTypes.GET_ORDERS,
        orders: orders
    }
}

const getOrdersErr = () => {
    console.log('hello from error')
    return{
        type:actionTypes.GET_ORDERS_ERROR
    }
}

export const getOrdersInit = (token) => {
    return dispatch => {
        axios.get('/orders.json?auth=' + token )
        .then(response => {
            let fetchedOrders=[]; 
            for(let key in response.data){
                fetchedOrders.push({
                    ...response.data[key],
                    id:key
                })
            }
            dispatch(getOrders(fetchedOrders));
        })
        .catch(err => {
            dispatch(getOrdersErr());
        })
    }
}