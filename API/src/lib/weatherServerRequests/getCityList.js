// Name: getCityList.js
// Author: Pawel Duda
// Description: 

import {HTTPRequest} from './HTTPRequest.js';

const requestOptions={
    method:'GET',
    path:'/api/city-list'
}

export function getCityList(){
    return new Promise((resolve, reject)=>{
        const HTTPRequestPromise=HTTPRequest(requestOptions);
        HTTPRequestPromise.then((value)=>{
            resolve(value);
        },(reason)=>{
            reject(reason);
        })
    })
}