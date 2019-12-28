// Name: Buttons.jsx
// Author: Pawel Duda
// Description: statless element which present list of buttons

import React from 'react';
import {Button} from 'antd';
import 'antd/dist/antd.css';
import PropTypes from 'prop-types';

const commonProps={

}

export function Buttons(props){
    return (<div>
        {props.buttonProps.map((element, index)=>{
            return <Button 
            key={index.toString()}
            {...commonProps}  
            {...element}/>;
            })
        }
    </div>)
}

Buttons.propTypes={
    buttonProps:PropTypes.arrayOf(PropTypes.object)      //in the array there are props for every button
}
