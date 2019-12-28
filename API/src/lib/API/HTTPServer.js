// Name: HTTPServer.js
// Author: Pawel Duda
// Description: function which return HttpServer
//argument:requestList - array of objects{pathName:<pathname string>, numberOfArguments:<number of arguments in pathname>, 
//requestFunction:<function>, checkAutorisation:<bool - if check jwt >}
//
// request list - list of responses for diferent requests url. It have additional argument: authorisation 
//for jwt

const http = require('http');
const url = require('url');
import {checkPathNameStartWith} from '../auxilaries/checkPathNameStartWith.js'

export function HTTPServer(requestList, jwtToken){
    return http.createServer(function server(request, response){

        const requestUrl = url.parse(request.url);
        const requestPathname=requestUrl.pathname;

        requestList.forEach((element)=>{    //for each response check if corresponding path was reveived
            const checkedURL=checkPathNameStartWith(requestPathname, element.pathName);
            if(checkedURL.valid===true && 
                checkedURL.arguments.length<=element.numberOfAguments){   //function is only call if request URL was valid
                if(element.checkAutorisation===false){  //
                    element.requestFunction(request, response, ...checkedURL.arguments);
                }
                
                else{
                    const auth=request.headers.authorization;
                    if(auth.startsWith('Bearer ')){
                        const token = auth.slice('Bearer '.length);
                        const userId = jwtToken.verify(token);
                        if (userId!==undefined){    //verification was OK
                            element.requestFunction(request, response, userId, ...checkedURL.arguments)
                        }
                        else{
                            response.writeHead(401, { 'Content-Type':'application/json' });
                            response.end();
                        }
                    }
                }
            }
        })
    })
}

       
