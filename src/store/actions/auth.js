import axios from 'axios';

import * as actionTypes from './actionTypes';


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
            console.log(Response);
            dispatch(authSuccess(Response.data))
            dispatch(checkingAuthTimeout(Response.data.expiresIn));
        })
        .catch(err => {
            console.log(err);
            dispatch(authFailed(err.response.data.error))
        })
    }
}