/* eslint-disable */
import React, { useState, useEffect } from 'react';

const LastUpdate = (params) => {
    const [lastUpdate, setLastUpdate] = useState('0 minutes ago');

    useEffect(() => {
        formatTimeSinceLastUpdate();
        const intervalId = setInterval(() => {
            setLastUpdate(formatTimeSinceLastUpdate())
        }, 1000);

        // Очищаем интервал при размонтировании компонента
        return () => clearInterval(intervalId);
    }, [params]);

    // Функция для форматирования времени, прошедшего с последнего обновления
    const formatTimeSinceLastUpdate = () => {
        const now = new Date();
        let value = new Date(params.value); 
        const diff = now - value;
        const seconds = Math.floor(diff / 1000);
        const minutes = Math.floor(seconds / 60);
        const hours = Math.floor(minutes / 60);
        const days = Math.floor(hours / 24);

        if (days > 0) {
            return `${days} days ago`;
        } else if (hours > 0) {
            return `${hours} hours ago`;
        } else {
            return `${minutes} minutes ago`;
        }
    };

    return (
        <div style={{
            display:"flex",
            flexDirection:"column",
            alignItems:"end",
            justifyContent:"center"
        }}>
            <p style={{margin:0}}>{lastUpdate}</p>
        </div>
    );
};

export default LastUpdate;
