import React from 'react';

import {configure} from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

import reducer from './auth';
import * as actionTypes from '../actions/actionTypes';

configure({adapter: new Adapter()});

describe('auth ' , () =>{

    it('should return the inintal state ', () => {
        expect( reducer(undefined,{})).toEqual({
            token: null, 
            userId: null,
            error: null, 
            loading: false
        })
    }); 

    it('i will see', () => {
        expect(reducer({ token: null, 
            userId: null,
            error: null, 
            loading: false}, { type: actionTypes.AUTH_SUCCESS, 
                               idToken: 'some-idToken',
                               userId: 'some-Id'}) )
        .toEqual({
            token:'some-idToken',
            userId: 'some-Id',
            loading:false,
            error:null,
        })
    })
});