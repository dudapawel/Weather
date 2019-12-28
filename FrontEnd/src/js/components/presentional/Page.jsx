// Name: Page.jsx
// Author: Pawel Duda
// Description: The stateless component responsible for layout of the page


import React from 'react';
import {WeatherDashboardContainer} from '../weatherDashboard/containers/WeatherDashboardContainer.jsx';

const style = {
    border: 'none',
}

export const Page = (props)=>{
    return (<div style={style}>
                <WeatherDashboardContainer/>
            </div>);
}

Page.propTypes={
}