// Name: saveTokenToMemory.js
// Author: Pawel Duda
// Description: save token to local memory

import {TOKEN_NAME} from '../constants'
import {getToken} from './getToken.js'

export function saveTokenToMemory(){
    return getToken().then((newToken)=>{
        localStorage.setItem(TOKEN_NAME, newToken);
    })
}