// Name: HTTPRequest.js
// Author: Pawel Duda
// Description: function which calls HTTP request. It is used by all weatherAPRRequests. It allows to add 
//additional functions to all requests
//

import {HTTPRequest} from './HTTPRequest.js'
import {saveTokenToMemory} from './saveTokenToMemory.js'
import {TOKEN_NAME} from '../constants'

export function HTTPRequestCaller(options){
    return HTTPRequest(options).catch(error=>{
       if (error.message==='401'){      //if response is 'unauthorized' (token in not valid) - aksk for new token
            return saveTokenToMemory().then(()=>{
                const token=localStorage.getItem(TOKEN_NAME);
                options.headers.Authorization=`Bearer ${token}`;
                return HTTPRequest(options)
            })
       }
       else {
           return Error(error);
       }
    })
}