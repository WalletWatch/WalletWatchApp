/* eslint-disable */
import React from 'react';
import NumberFilter from './filters/number_filter';
import TextFilter from './filters/text_filter';

import "./style.css";
import ColsFilter from './filters/cols_filter';

export default (props) => {
    
    return (
        <div style={{ textAlign: 'center' }}>
            <TextFilter api={props.api} node="wallet_name"/>
            <TextFilter api={props.api} node="asset"/>
            <ColsFilter api={props.api}/>
            <NumberFilter api={props.api}/>
        </div>
    );
};
