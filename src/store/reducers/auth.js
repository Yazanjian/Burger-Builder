
import * as actionTypes from '../actions/actionTypes';

const initialState = { 
    token: null, 
    userId: null,
    error: null, 
    loading: false
};

const authFailed = (state,action) => {
    return{
        ...state,
        loading:false,
        error:action.error
    }
}

const authStart = (state,action) => {
    return{
        ...state,
        loading:true,
        error:null
    }
}

const authSuccess = (state,action) => {
    return{
        ...state,
        token:action.idToken,
        userId: action.userId,
        loading:false,
        error:null,
    }
}




const reducer = (state=initialState, action) => {
    switch (action.type) {
        case actionTypes.AUTH_START: return authStart(state,action);
        case actionTypes.AUTH_SUCCESS : return authSuccess(state, action);
        case actionTypes.AUTH_FAILED : return authFailed(state,action);
        default : return state;
    }
};

export default reducer;