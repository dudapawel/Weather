// Name: getAvailableCity.js
// Author: Pawel Duda
// Description: send request for available cities with filter string

import {HTTPRequestCaller} from './HTTPRequestCaller.js';



export function getAvailableCity(filterString){
    const requestOptions={
        method:'GET',
        path:`/API/city-list/${filterString}`
    }
    return HTTPRequestCaller(requestOptions);
}