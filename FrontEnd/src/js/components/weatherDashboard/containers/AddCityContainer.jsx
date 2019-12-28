// Name: AddCityContainer.jsx
// Author: Pawel Duda
// Description: Statfull component in which is stored state of the city to add

import React from 'react';
import PropTypes from 'prop-types';
import {AddCity} from '../presentional/AddCity.jsx';
import { getAvailableCity } from '../weatherAPIRequests/getAvailableCity.js';
import {addCityToUser} from '../weatherAPIRequests/addCityToUser.js'

export class AddCityContainer extends React.Component{
    constructor(props){
        super(props);
        this.state={
            selectedCity:'',
            listOfCities:[]
        }
        this.updateListofCities=this.updateListofCities.bind(this);
        this.addCityFunc=this.addCityFunc.bind(this);
    }
    updateListofCities(filterString){
        this.setState({                     //clear list while there is no answer
            listOfCities:[]
        });
        getAvailableCity(filterString).then((newListOfCities)=>{
            this.setState({
                listOfCities:newListOfCities
            })
        })
    }
    addCityFunc(){
        if(this.state.listOfCities.length===1){
            try{
                addCityToUser(this.state.listOfCities[0].id).then(this.props.refresh());
            }
            catch(error){
                window.console.warn(error);
            }
        }
    }
    render(){
        return (<AddCity
            updateListofCities={this.updateListofCities}
            addCityFunc={this.addCityFunc}
            listOfCities={this.state.listOfCities}
        />)
    }
}

AddCity.propTypes={
    refresh:PropTypes.func
}