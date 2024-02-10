/* eslint-disable */
import React from 'react';
import NumberFilter from './filters/numberFilter';
import TextFilter from './filters/textFilter';

import "./style.css";
import ColsFilter from './filters/colsFilter';

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
