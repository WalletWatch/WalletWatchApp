import React from 'react';
import "./alert_item.css";

type Alert = {
    asset: string,
    wallet: string,
    balance: number,
    price: number,
    updated: string
}

type AlertItemProps = {
    indx: number;
    alert: Alert;
}

function AlertItem({indx, alert}: AlertItemProps) {
    const formatDate = (date: string) => {
        let d:Date = new Date(date);
        
        let hh = d.getHours();
        let mm = d.getMinutes();
        let ss = d.getSeconds();

        return `${hh}:${mm}:${ss}`
    }
    {console.log(alert.balance)}

    return (
        <div 
            className="alert_item_wrapper"
            data-testid="alert_item"
        >
            <div className="alert_item">
                <div className='alert_item_wallet'>
                    {alert.wallet}
                </div>
                <div style={{marginRight: "0px"}}>
                    {alert.asset}
                </div>
            </div>
            <div className="alert_item">
                <div className={alert.balance>0? "up": alert.balance<0? "down": "null"} style={{marginLeft: "50px"}}>
                    {alert.balance.toFixed(4)}
                </div>
                <div className={alert.price>0? "up": alert.price<0? "down": "null"}>
                    {alert.price.toFixed(4)}
                </div>
            </div>
            <div className="alert_time">
                {formatDate(alert.updated)}
            </div>
        </div>
    );
}

export default AlertItem;
