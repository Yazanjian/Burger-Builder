import axios from 'axios';

import * as actionTypes from './actionTypes';
import logout from '../../containers/Auth/logout/logout';


export const authStart = () =>{
    return{
        type:actionTypes.AUTH_START
    }
}

export const authSuccess = (authData) =>{
    return{
        type:actionTypes.AUTH_SUCCESS,
        idToken : authData.idToken,
        userId:authData.localId
    }
}

export const authFailed = (err) =>{
    console.log(err);
    return{
        type:actionTypes.AUTH_FAILED,
        error : err
    }
}

export const authLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('expirationDate');
    localStorage.removeItem('userId');    
    return{
        type: actionTypes.AUTH_LOGOUT
    }
}

export const checkingAuthTimeout = (timeToLogOut) => {
    return dispatch => {
        setTimeout(() => {
            dispatch(authLogout());
        }, timeToLogOut * 1000 );
    }
}

export const authInit = (email, password, isSingUp) =>{
    return dispatch => {
        dispatch(authStart());
        const authData = {
            email: email,
            password:password,
            returnSecureToken:true
        }
        let url = "https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyDmvciQVB6hI-NGRQzmXFPHvC4iZ6ZZCI4";
        if(!isSingUp){
            url = "https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyDmvciQVB6hI-NGRQzmXFPHvC4iZ6ZZCI4";
        }
        axios.post(url, authData)
        .then(Response => {
            // console.log(Response);
            const expirationDate = new Date(new Date().getTime() + Response.data.expiresIn * 1000 );
            localStorage.setItem('token', Response.data.idToken);
            localStorage.setItem('expirationDate', expirationDate);
            localStorage.setItem('userId', Response.data.localId);
            dispatch(authSuccess(Response.data));
            dispatch(checkingAuthTimeout(Response.data.expiresIn));
        })
        .catch(err => {
            console.log(err);
            dispatch(authFailed(err.response.data.error))
        })
    }
}

export const authcheckState = () => {
    return dispatch => {
        const token = localStorage.getItem('token');
        if(!token){
            dispatch(authLogout());
        }else{
            const expirationDate = new Date (localStorage.getItem('expirationDate'));
            if(expirationDate <= new Date()){
                dispatch(authLogout())
            }else{
                const userId = localStorage.getItem('userId');
                dispatch(authSuccess(token,userId));
                dispatch(checkingAuthTimeout((expirationDate.getTime() - new Date().getTime())/ 1000 ));
            }
        }
    }
}