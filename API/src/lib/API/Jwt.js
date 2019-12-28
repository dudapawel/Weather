// Name: Jwt.js
// Author: Pawel Duda
// Description: class which code and decode jwt

const nJwt=require('njwt');
const secureRandom=require('secure-random');

import {SIGNING_KEY_LENGTH} from '../constants';
import {CLAIMS_ISS} from '../constants';
import {CLAIMS_SCOPE} from '../constants';

export class  Jwt {
    constructor(){
        this._signingKey=secureRandom(SIGNING_KEY_LENGTH, {type: 'Buffer'} )
    }
    create(userId){
        const claims = {
            iss: CLAIMS_ISS,  
            sub: userId,    
            scope: CLAIMS_SCOPE
        }
        const jwt=nJwt.create(claims,this._signingKey)
        const compactedJwt = jwt.compact();
        return compactedJwt;
    }
    verify(token){
        try{
            const verifiedJwt = nJwt.verify(token,this._signingKey);
            return verifiedJwt.body.sub;     //retrurns userID
        }catch(err){
            return undefined;
        }
    }
}