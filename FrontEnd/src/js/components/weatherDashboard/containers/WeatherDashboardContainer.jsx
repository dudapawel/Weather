// Name: WeatherDashboardContainer.jsx
// Author: Pawel Duda
// Description: The stateful, top component of the weatherDashboard aplication. Stores properities of all 
// widgets

import React from 'react';
import {WidgetList} from '../presentional/WidgetList.jsx'
import {getWeather } from '../weatherAPIRequests/getWeather.js';
import {AddCityContainer} from './AddCityContainer.jsx';

export class WeatherDashboardContainer extends React.Component{
    constructor(props){
        super(props);
        this.state={
            weatherProperties:[]    //array of objects of City and Weather
        }
        this.refresh=this.refresh.bind(this);
    }
    componentDidMount(){
        this.refresh();
    }
    refresh (){
        try{
            getWeather().then((newWeatherProperties)=>{
                this.setState({
                    weatherProperties:newWeatherProperties
                });
                return ;
            });
        }
        catch(error){
            window.console.warn(error);
        }
    };
    render(){
        return (<div>
        <AddCityContainer refresh={this.refresh}/>
        <WidgetList refresh={this.refresh}
                weatherProperties={this.state.weatherProperties}
        />
        </div>);
    }
}