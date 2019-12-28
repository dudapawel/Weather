// Name: getWeather.js
// Author: Pawel Duda
// Description: 

import {HTTPRequest} from './HTTPRequest.js';



export function getWeather(cityId){
    return new Promise((resolve, reject)=>{
        const requestOptions={
            method:'GET',
            path:`/api/weather/${cityId}`
        }
        const HTTPRequestPromise=HTTPRequest(requestOptions);
        HTTPRequestPromise.then((value)=>{
            resolve(value);
        },(reason)=>{
            reject(reason);
        })
    })
}