// Name: checkPathNameStartWith.js
// Author: Pawel Duda
// Description: Check begining of URL and returns object {valid: <true if pathName starts with pathNameBegining>, 
//             arguments: array of text after '/'}

export function checkPathNameStartWith(pathName, pathNameBegining){
    //check arguments type
    if(typeof pathName!=='string' ||                
        typeof pathNameBegining!=='string'){
        return {valid:false, arguments:[]};
    }
    if(pathName.startsWith(pathNameBegining)!==true){
        return {valid:false, arguments:[]}
    }
    const restOfPathName=pathName.slice(pathNameBegining.length);
    const allArguments=restOfPathName.split('/');
    const argumentsWithoutEmpty=allArguments.filter((element)=>{
        return element.length>0;
    })
    return {valid:true, arguments:argumentsWithoutEmpty};
}