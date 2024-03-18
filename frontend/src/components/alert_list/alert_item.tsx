import React from 'react';
import "./alert_item.css";
import { Alert } from '../../types';

type AlertItemProps = {
    indx: number;
    alert: Alert;
}

function AlertItem({indx, alert}: AlertItemProps) {
    return (
        <div 
            className="alert_item_wrapper"
            style={{borderColor: alert.balance>0? "#00a186":"#dc3545"}}
            data-testid="alert_item"
        >
            <div className='alert_text'>
                <svg className="w-[30px] h-[30px] text-gray-800 dark:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24">
                    <path stroke="currentColor" color={alert.balance>0? "#00a186":"#dc3545"} strokeLinecap="round" strokeLinejoin="round" strokeWidth="1" d="M10 11h2v5m-2 0h4m-2.592-8.5h.01M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"/>
                </svg>
            </div>
            <div className='alert_text' style={{marginLeft: "5px", width: "120px"}}>{alert.updated}</div>
            <div className='alert_text' style={{marginLeft: "5px"}}>
                {
                    alert.asset
                    ?
                    <span>Balance of <b>{alert.asset}({alert.network})</b> on <b>{alert.wallet}</b> changed: </span>
                    :
                    <span>Balance of <b>{alert.wallet}</b> changed: </span>
                }
                <span className={alert.balance>0? "up alert_balance":"down alert_balance"}>${alert.balance.toFixed(4)}</span>.
            </div>
        </div>
    );
}

export default AlertItem;
