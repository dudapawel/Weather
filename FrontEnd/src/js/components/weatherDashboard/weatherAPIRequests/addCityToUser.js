// Name: addCityToUser.js
// Author: Pawel Duda
// Description:  send request to server to add city to user. 
//User is authorized by token

import {HTTPRequestCaller} from './HTTPRequestCaller.js';
import {takeTokenFromMemory} from './takeTokenFromMemory.js'



export function addCityToUser(cityId){
    return takeTokenFromMemory().then((token)=>{
        const requestOptions={
            method:'GET',
            path:`/API/add-city/${cityId}`,
            headers:{
                Authorization: `Bearer ${token}`,
            }
        }
        return HTTPRequestCaller(requestOptions);
    });
        
}