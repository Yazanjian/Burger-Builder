import React , {Component} from 'react';
import { connect } from 'react-redux';

import Button from '../../components/UI/button/button';
import Input from '../../components/UI/Input/Input';
import styles from './Auth.module.css';
import Spinner from '../../components/UI/spinner/spinner';
import * as actions from '../../store/actions/index';
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
        )
 
        return(
            <>  
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
        error :state.Auth.error
    }
};

const mapDispatchToProps = dispatch => {
    return{
        onAuth : (email, password, isSignUp) => dispatch(actions.authInit(email,password,isSignUp))
    }
}

export default connect(mapStateToProps,mapDispatchToProps)(Auth);