// Name: PageContainer.jsx
// Author: Pawel Duda
// Description: The top component in the aplication. Do nothing, it is to simulate rest of the aplication

import React from 'react';
import ReactDOM from 'react-dom';
import {Page} from '../presentional/Page.jsx';

class PageContainer extends React.Component{
    constructor(props){
        super(props);
    }
    render(){
        return (<Page/>);
    }
}

export default PageContainer;
ReactDOM.render(<PageContainer/>, document.getElementById('app'));