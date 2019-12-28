// Name: WindowProperties.js
// Author: Pawel Duda
// Description: Class which keeps properties of the WindowContainer.jsx and methods to operate it

export class WindowProperties{
    constructor(content, buttons){
        this._content=content;      //content can be of any type
        this._buttons=buttons;
    }
    //getters and setters
    get content(){
        return _content;

    }
    set content(newContent){
        _content=newContent;
    }
    get buttons(){
        return _buttons;

    }
    set buttons(newButtons){
        _buttons=newButtons;
    }
    //other methods
    

}