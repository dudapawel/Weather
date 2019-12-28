// Name: Widget.jsx
// Author: Pawel Duda
// Description: Stateless component for presention of widget

import React from 'react';
import PropTypes from 'prop-types';
import {Card} from 'antd';
import 'antd/dist/antd.css';
import {WeatherPresentation} from './WeatherPresentation.jsx';
import {Buttons} from './Buttons.jsx'
import {removeCityFromUser} from '../weatherAPIRequests/removeCityFromUser.js';


const cardStyle={
}

const headStyle={
    backgroundColor:'blue'
}
const bodyStyle={
    backgroundColor:'lightBlue'
}

export const Widget=(props)=>{
    const remove = function(){
        try{
            removeCityFromUser(props.weatherProperty.city.id).then(props.refresh());
        }
        catch(error){
            window.console.warn(error);
        }
    }.bind(this);

    const buttonProps=[
        {
            icon:'close',
            onClick:remove
        },
        {
            icon:'reload',
            onClick:props.refresh
        }
    ]
    return (<Card 
    headStyle={headStyle}
    bodyStyle={bodyStyle}
    style={cardStyle}
    title={props.weatherProperty.city.name} 
    extra={<Buttons buttonProps={buttonProps}/>}>
        <WeatherPresentation weather={props.weatherProperty.weather}/>
    </Card>)
}

Widget.propTypes={
    weatherProperty:PropTypes.object,
    refresh:PropTypes.func
}
