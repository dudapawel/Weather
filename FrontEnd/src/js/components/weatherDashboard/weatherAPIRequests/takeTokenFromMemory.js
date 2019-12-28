// Name: takeTokenFromMemory.js
// Author: Pawel Duda
// Description: get token from local memory

import {TOKEN_NAME} from '../constants'
import {saveTokenToMemory} from './saveTokenToMemory.js'

export function takeTokenFromMemory(){
    let token = localStorage.getItem(TOKEN_NAME);
    if(token===null){               // there is no token in memory
        return saveTokenToMemory().then(()=>{
            token=localStorage.getItem(TOKEN_NAME);
            if(token===null){       // there is no token in memory
                throw 'Could not save token in local storage';
            }
            else{
                return token;
            }
        })
    }
    else{
        return new Promise((resolve, reject)=>{
            resolve(token);
        })
    }
}