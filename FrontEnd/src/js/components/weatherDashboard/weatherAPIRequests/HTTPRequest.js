// Name: HTTPRequest.js
// Author: Pawel Duda
// Description:function which returns promise to make standard HTTP request. 
// argument: options - some parameters for the request

import {DEFAULT_REQUEST_OPTIONS} from '../constants'

const http = require('http');

export function HTTPRequest (options){
    let connectedOptions=Object.assign({},DEFAULT_REQUEST_OPTIONS);
    if(typeof options==='object'){
        connectedOptions=Object.assign(connectedOptions, options);
    }
    return new Promise((resolve, reject)=>{
        const req=http.get(connectedOptions);
        req.end();

        req.on('connect', (response, socket, head)=>{
        });
        req.on('error',function onError(error){
            reject(error.message);
        })

        req.on('response', function onResponse(response){
            if (response.statusCode!=200){
                reject (Error(response.statusCode));
            }
            let rawData='';
            response.on('data',(chunk)=>{
                rawData+=chunk;
            })

            response.on('end', function onEnd(){
                if(response.headers['content-type']==='application/json'){
                    try {
                        const parsedData = JSON.parse(rawData);
                        resolve(parsedData);
                    } catch (error) {
                        reject(error);
                    }
                }
                else{
                    resolve(rawData)
                }
            })

            response.on('error', function onError(error){
                reject(error);
            })
        })

    })
    
    
}