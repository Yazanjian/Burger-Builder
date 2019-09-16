import React, {Component} from 'react';
import { connect } from 'react-redux';

// import axios from '../../axios-orders';
import * as actions from '../../store/actions/index';
import Order from '../../components/Order/Order';
import Spinner from '../../components/UI/spinner/spinner';
class Orders extends Component {
    // state={
    //     orders:[],
    //     loading:true
    // }

    componentDidMount(){
        // axios.get('/orders.json')
        // .then(response => {
        //     let fetchedOrders=[]; 
        //     for(let key in response.data){
        //         fetchedOrders.push({
        //             ...response.data[key],
        //             id:key
        //         })
        //     }
        //     this.setState({loading:false, orders:fetchedOrders})
        // })
        // .catch(err => {
        //     this.setState({loading:false})
        // })
        this.props.getOrders();
    }

    render(){ 
        let orders =  this.props.orders.map(order => {
                            return (<Order key={order.id}
                                price={order.price}
                                ingredients={order.ingredients}/>)
                        });
        
        return(
            <div>
                {this.props.loading ? <Spinner /> : orders}
            </div>  
        )
    }
}


const mapStateToProps = state => {
    return{
        loading:state.orders.loading,
        orders:state.orders.orders
    }
};

const mapDispatchToProps = dispatch => {
    return{
        getOrders: () => dispatch(actions.getOrdersInit())
    }
}

export default connect(mapStateToProps,mapDispatchToProps)(Orders);
// export default Orders;