// Name: AddCity.jsx
// Author: Pawel Duda
// Description: Statless component for presention of add city area

import React from 'react';
import PropTypes from 'prop-types';
import {Button,AutoComplete} from 'antd';
import 'antd/dist/antd.css';


export function AddCity(props){
    const autoCompleteProps={
        placeholder:'city',
        style:{
            width:300,
        },
        dataSource:props.listOfCities.map(element=>{
            return element.name;
        }),
        onChange:function onChangeHandler(value){
            props.updateListofCities(value);
        },
        onSwitch:function onSwitchHandler(value){
            props.updateListofCities(value);
        },
        onBlur:function onBlurHandler(){
        }
    }

    const buttonProps={
        shape:'round',
        icon:'plus',
        style:{
            display:'inline'
        },
        onClick:function onClickHandler(){
            props.addCityFunc();
        },
    }


    return <div>
        <AutoComplete {...autoCompleteProps}/>
        <Button {...buttonProps}/>
    </div>
}

AddCity.propTypes={
    updateListofCities:PropTypes.func,
    addCityFunc:PropTypes.func,
    listOfCities:PropTypes.array
}