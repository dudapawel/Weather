// Name: UserList.js
// Author: Pawel Duda
// Description: List of users (client) connected to API

import {ListById} from './ListById';
import {UserProperties} from './UserProperties.js'

export class UserList {
    constructor(){
        this._list=new ListById();
    }
    newUser(){
        return this._list.addElement(new UserProperties());
    }
    getUser(userId){
        return this._list.getElement(userId);
    }
}