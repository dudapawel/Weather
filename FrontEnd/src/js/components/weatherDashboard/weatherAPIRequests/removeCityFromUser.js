// Name: removeCityFromUser.js
// Author: Pawel Duda
// Description: send request to server to remove city from user 
//User is authorized by token

import {HTTPRequestCaller} from './HTTPRequestCaller.js';
import {takeTokenFromMemory} from './takeTokenFromMemory';



export function removeCityFromUser(cityId){
    return takeTokenFromMemory().then((token)=>{
        const requestOptions={
            method:'GET',
            path:`/API/remove-city/${cityId}`,
            headers:{
                Authorization: `Bearer ${token}`,
            }
    
        }
        return HTTPRequestCaller(requestOptions);
    });
}