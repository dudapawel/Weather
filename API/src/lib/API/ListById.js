// Name: ListById.js
// Author: Pawel Duda
// Description: list in which elements can be called by ID

export class ListById{      
    constructor(){
        this._elements={};
        this._nextNewId=1;
        this._deletedId=[];
    }
    getElement(id){
        return this._elements[id];    //if no element return undefined
    }
    setElement(id,newElement){
        if (id in this._elements){
            this._elements[id]=newElement;
        }
        else{
            throw Error('Can not set if element not exist')
        }
    }
    addElement(newElement){
        let idToAdd=0;
        if(this._deletedId.length>0){
            idToAdd=this._deletedId.pop();
        }
        else{
            idToAdd=this._nextNewId;
            this._nextNewId+=1;
        }
        this._elements[idToAdd]=newElement;
        return idToAdd;
    }
    deleteElement(id){
        if (id in this._elements){
            delete this._elements[id];
            this._deletedId.push(id);
        }
    }
}