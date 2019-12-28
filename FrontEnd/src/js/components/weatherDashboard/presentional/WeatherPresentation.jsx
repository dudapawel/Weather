// Name: WeatherPresentation.jsx
// Author: Pawel Duda
// Description: Statless component for presention of weather

import React from 'react';
import {Popover, Icon} from 'antd';
import 'antd/dist/antd.css';
import PropTypes from 'prop-types'



export function WeatherPresentation (props){
    const popoverContent = (<div>
          <p>Clouds:{props.weather.cloudPercentage}%</p>
          <p>Rain:{props.weather.rainAmount}mm</p>
        </div>);


    return (<div>
        <Popover content={popoverContent}>
            <Icon type='info-circle'/>
        </Popover>
        <p>Temperature:{props.weather.temperature}</p>

    </div>)
}

WeatherPresentation.proptypes={
    weather:PropTypes.exact({
        
    })
}