// Name: UserProperties.js
// Author: Pawel Duda
// Description: class which stores data for every user(client). Data is list of cities 

import {ListWithoutRepeat} from './ListWithoutRepeat.js';

export class UserProperties{
    constructor(){
        this._cityList=new ListWithoutRepeat();   //list of objects {id:<cityId> ,name:<cityName> }
    }
    addCity(cities){
        const compareFunction=(newElement, listElement)=>{
            return newElement.id===listElement.id;
        }
        this._cityList.addElements(cities, compareFunction);
    }
    removeCity(cityIds){
        const compareFunction=(toRemoveArgument, listElement)=>{
            return toRemoveArgument===listElement.id;
        }
        this._cityList.removeElements(cityIds, compareFunction);
    }
    getCities(){
        return this._cityList.elements;
    }
}