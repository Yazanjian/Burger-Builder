import React , {Component} from 'react';
import { connect } from 'react-redux';
import {Redirect} from 'react-router-dom';

import Button from '../../components/UI/button/button';
import Input from '../../components/UI/Input/Input';
import styles from './Auth.module.css';
import Spinner from '../../components/UI/spinner/spinner';
import * as actions from '../../store/actions/index';

var clickedDirectly = true;
class Auth extends Component{ 
    state = {
        Controls: {
            email:
            {
                elementType:"input",
                elementConfig:{
                    type:'email',
                    placeholder:'Your Email'
                },
                value:''
            },
            password:
            {
                elementType:"input",
                elementConfig:{
                    type:'password',
                    placeholder:'Your Password'
                },
                value:''
            }
        },
        isSignUp:true
    }

   

    componentDidMount(){
        if(this.props.location.state){//if this page was loading because of SIGN IN FIRST button which is located in BurgerBuilder container
            //here we will redirect to check out directly 
            clickedDirectly= false;
        }
        else{//if the page was loaded because of direct click on it 
            // here we will return to burger builder as usual 
            clickedDirectly= true;
        }
    }

    inputChangeHandler = (event,key) => {
        let updatedControls = {...this.state.Controls};
        let updatedControlsElement = {...updatedControls[key]};

        updatedControlsElement.value = event.target.value;
        updatedControls[key] = updatedControlsElement;
        this.setState({Controls:updatedControls});
    }

    handleSubmition = (event) => {
        event.preventDefault();
        this.props.onAuth(this.state.Controls.email.value, this.state.Controls.password.value, this.state.isSignUp);
    }

    switchAuthModeHandler = () => {
        this.setState(prevState => {
            return{
                isSignUp : !prevState.isSignUp
            }
        })
    }

    render(){
        const formArray = [];
        for(let key in this.state.Controls){
            formArray.push({
                id:key,
                config:this.state.Controls[key]
            })
        };

        let errorMsg = this.props.error ? <p> {this.props.error.message} </p> : null;

        let form = (
            <form onSubmit={this.handleSubmition}>
                {errorMsg}     
                {formArray.map(configElement => {
                   return <Input 
                       key={configElement.id}
                       elementType={configElement.config.elementType}
                       elementConfig={configElement.config.elementConfig}
                       value={configElement.config.value}
                       change={(event) => this.inputChangeHandler(event, configElement.id)}/> 
                   })}             
                   <Button btnType="Success"> SUBMIT </Button>  
           </form>
        );

        let redirectToHomePage = null ;
        redirectToHomePage = (this.props.isAuth && clickedDirectly) 
        ? <Redirect to="/" /> 
        : (this.props.isAuth) 
                            ? this.props.history.push({
                                pathname: '/Checkout',
                                state:{ingredients:this.props.ing , price:this.props.price}
                            })
                            :null
 
        return(
            <>  
                {redirectToHomePage}
                {this.props.loading ? <Spinner /> : 
                    <div className={styles.Auth}>
                        {form}
                        <Button btnType="Danger" clicked={this.switchAuthModeHandler}> Switch to {this.state.isSignUp ? "sing in" : "sign up"} </Button>
                    </div>}
            </>
        )
    }
}

const mapStateToProps = state => {
    return{
        loading:state.Auth.loading,
        error :state.Auth.error,
        isAuth: state.Auth.token,
        ing: state.burgerBuilder.ingredients,
        price: state.burgerBuilder.totalPrice,
    }
};

const mapDispatchToProps = dispatch => {
    return{
        onAuth : (email, password, isSignUp) => dispatch(actions.authInit(email,password,isSignUp))
    }
}

export default connect(mapStateToProps,mapDispatchToProps)(Auth);