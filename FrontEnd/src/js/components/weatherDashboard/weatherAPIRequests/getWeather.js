// Name: getWeather.js
// Author: Pawel Duda
// Description: send request to server for current weather information for the user. 
//User is authorized by token

import {HTTPRequestCaller} from './HTTPRequestCaller.js';
import {takeTokenFromMemory} from './takeTokenFromMemory';



export function getWeather(){
    return takeTokenFromMemory().then((token)=>{
        const requestOptions={
            method:'GET',
            path:`/API/get-weather`,
            headers:{
                Authorization: `Bearer ${token}`,
            }
    
        }
        return HTTPRequestCaller(requestOptions);
    });
}