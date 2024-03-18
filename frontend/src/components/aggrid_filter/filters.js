/* eslint-disable */
import React from 'react';
import TextFilter from './filters/text_filter';

import "./style.css";
import ColsFilter from './filters/cols_filter';

export default (props) => {
    
    return (
        <div style={{ textAlign: 'center' }}>
            <TextFilter api={props.api} node="wallet_name"/>
            <TextFilter api={props.api} node="asset"/>
            <TextFilter api={props.api} node="network_name"/>
            <ColsFilter api={props.api}/>
        </div>
    );
};
