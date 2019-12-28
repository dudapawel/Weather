// Name: ListWithoutRepeat.js
// Author: Pawel Duda
// Description: This is array based list in which do not add the same element second time

export class ListWithoutRepeat{
    constructor(elements){
        this._elements=[];
        this.addElements(elements);
    }
    get elements(){
        return this._elements;
    }
    addOneElement(newElement, compareFunction){
        if(this._elements.findIndex(element=>{
            return compareFunction(newElement, element);
        })===-1 &&  newElement!==undefined){
            this._elements.push(newElement)
        }
    }
    addElements(newElements, compareFunction){
        if(typeof newElements==='array'){
            newElements.forEach(element => {
                this.addOneElement(element, compareFunction)
            });
        }
        else{
            this.addOneElement(newElements, compareFunction);
        }
    }
    removeOneElement(toRemoveArgument, compareFunction){   
        const indexOfElement=this._elements.findIndex(element=>{
            return compareFunction(toRemoveArgument,element)
        });
        if(indexOfElement!==-1){
            this._elements.splice(indexOfElement, 1);
        }
    }
    removeElements(toRemoveArguments,compareFunction){
        if(typeof elements==='array'){
            toRemoveArguments.forEach(element => {
                this.removeOneElement(element,compareFunction)
            });
        }
        else{
            this.removeOneElement(toRemoveArguments,compareFunction);
        }
    }
}