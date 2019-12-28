// Name: getToken.js
// Author: Pawel Duda
// Description: send request to recive new token

import {HTTPRequestCaller} from './HTTPRequestCaller.js';

const requestOptions={
    method:'GET',
    path:'/getToken'
}

export function getToken(){
    return HTTPRequestCaller(requestOptions);
}