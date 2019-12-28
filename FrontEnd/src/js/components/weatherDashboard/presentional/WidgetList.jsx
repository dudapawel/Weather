// Name: WeatherDashboardContainer.jsx
// Author: Pawel Duda
// Description: The stateless component which make grid of widgets

import React from 'react';
import {Widget} from '../presentional/Widget.jsx';
import PropTypes from 'prop-types';
import {Row, Col} from 'antd';
import 'antd/dist/antd.css';


const WIDGETS_SPAN= 4; //  24/span   -  number of widgets in row

export function WidgetList (props){
    return (<Row>
        {props.weatherProperties.map((element)=>{
                return <Col key={element.city.id}
                span={WIDGETS_SPAN}>
                    <Widget weatherProperty={element} 
                    refresh={props.refresh}/>
                </Col>
            })}
    </Row>)
}

WidgetList.propType={
    refresh:PropTypes.func,
    weatherProperties:PropTypes.array
}
