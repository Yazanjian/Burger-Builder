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

export const getOrdersInit = (token,userId) => {
    return dispatch => {
        const queryParams = "?auth=" + token + '&orderBy="userId"&equalTo="' + userId+ '"';
        axios.get('/orders.json' +queryParams)
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