/* eslint-disable */
import React, { useEffect, useState } from 'react';
import "../style.css";

const DateFilter = (props) => {
    const api = props.api;

    const [min, setMin] = useState();
    const [max, setMax] = useState(0);
    const [inputMin, setInputMin] = useState(0);
    const [inputMax, setInputMax] = useState(0);
    const [minValue, setminValue] = useState(0);
    const [maxValue, setmaxValue] = useState(0);
    const [step, setStep] = useState(1);
    const node = 'updated';

    const modelUpdate = () => {

        let result = [];
        api.forEachNode(elem => {
            result.push(new Date(elem.data[node]));
        });
        let minResult = Math.min(...result);
        let maxResult = Math.max(...result);
        
        setMax(maxResult);
        setMin(minResult);

        setInputMin(formatDate(minResult));
        setInputMax(formatDate(maxResult));

        setStep(1 / (10 ** f(minResult)));

        setminValue(minResult);
        setmaxValue(maxResult);
    };

    useEffect(() => {
        gridReady();
    }, [api]);

    useEffect(() => {
        api.addEventListener('firstDataRendered', modelUpdate);
    
        return () => {
            if (!api.isDestroyed()) {
                api.removeEventListener('firstDataRendered', modelUpdate);
            }
        };
    }, [api])

    const f = x => ( (x.toString().includes('.')) ? (x.toString().split('.').pop().length) : (0) );

    const formatDate = (value) => {
        let date = new Date(value);

        var dd = date.getDate();
        if (dd < 10) dd = '0' + dd;

        var mm = date.getMonth() + 1;
        if (mm < 10) mm = '0' + mm;

        var yy = date.getFullYear();

        var hh = date.getHours();
        if (hh < 10) hh = '0' + hh;

        var min = date.getMinutes();
        if (min < 10) min = '0' + min;

        var ss = date.getSeconds();
        if (ss < 10) ss = '0' + ss;

        let fullDate = yy + '-' + mm + '-' + dd;
        let fullHour = hh + ":" + min + ":" + ss;

        return fullDate + " " + fullHour;
    }

    function slideOne(value){    
        if (Number(value) >= Number(maxValue)) {
            setInputMin(formatDate(Number(maxValue)));
            setminValue(maxValue);
        }

        setInputMin(formatDate(Number(value)));
        setminValue(value);
        fillColor(node);
    }
    
    function slideTwo(value){
        if (Number(value) <= Number(minValue)) {
            setInputMax(formatDate(Number(minValue)));
            setmaxValue(minValue);
        }

        setInputMax(formatDate(Number(value)));
        setmaxValue(value);
        fillColor();
    }
    
    function fillColor() {
        let sliderTrack = document.querySelector(`.slider-track-${node}`);
        
        let percent1 = ((minValue - min) / (max - min)) * 100;
        let percent2 = ((maxValue - min) / (max - min)) * 100;
        
        sliderTrack.style.background = `linear-gradient(to right, #e5e5e5 ${percent1}% , #666666 ${percent1}% , #666666 ${percent2}%, #e5e5e5 ${percent2}%)`;
    }

    function clickApplyDate(e) {
        api.setColumnFilterModel(node, {
            operator: 'AND',
            conditions: [
                {
                    filterType: 'date',
                    type: 'greaterThan',
                    dateFrom: formatDate(Number(minValue) - 24 * 60*1000)
                },
                {
                    filterType: 'date',
                    type: 'lessThan',
                    dateFrom: formatDate(Number(maxValue) + 24 * 60*1000)
                }
        ]}).then(() => {
            api.onFilterChanged();
        })
    }

    // function inputNumeric(event, side) {
    //     if (event.code == "Enter") {
    //         let number = Number(event.target.value);
            
    //         if (!isNaN(number)) {
    //             if (side == "one") 
    //                 setNumberInputOne();
    //             else if (side == "two")
    //                 setNumberInputTwo();
    //         }
    //     }
    // }
    // function setNumberInputOne() {        
    //     if (Number(inputMin) >= Number(maxValue)) {
    //         setminValue(maxValue)
    //         setInputMin(formatDate(maxValue));
    //     } else {
    //         setminValue(inputMin);
    //     }

    //     clickApplyNumeric();
    //     fillColor();
    // }

    // function setNumberInputTwo() {
    //     if (Number(inputMax) <= Number(minValue)) {
    //         setmaxValue(minValue);
    //         setInputMax(formatDate(minValue));
    //     } else {
    //         setmaxValue(inputMax);
    //     }
    //     clickApplyNumeric();
    //     fillColor();
    // }


    return (
        <div
            className='numeric-filter' 
            style={{height: "70px"}}
            id={node}
        >
            <div style={{overflow: "hidden", height: "100%"}}>
                <span className='name-numeric-filter'>
                    {node}
                </span>
                <div className={`values values-${node}`}>
                    <input 
                        id={`range1-${node}`}
                        className='input-numeric-slider'
                        type ='text'

                        value={inputMin}
                        // onChange={event => setInputMin(event.target.value)}
                        // onKeyPress={event => inputNumeric(event, "one")}
                    >
                    </input>
                    <input 
                        id={`range2-${node}`}
                        className='input-numeric-slider'
                        style={{textAlign: "end"}}
                        type ='text'

                        value={inputMax}
                        // onChange={event => setInputMax(event.target.value)}
                        // onKeyPress={event => inputNumeric(event, "two")}
                    >
                    </input>
                </div>
                <div className='container container-updated'>
                    <div 
                        className={`slider-track slider-track-${node}`}
                        style={{background: "#666666"}}
                        // onMouseDown={event => clickTrack(event, node)}
                    ></div>
                    <input 
                        id={`slider-1-${node}`}
                        className='input-slider1'
                        type='range' 

                        min={min}
                        max={max}
                        step={step}
                        value={minValue}

                        onChange={e => slideOne(e.target.value)}
                        onMouseUp={clickApplyDate}
                    />
                    <input 
                        id={`slider-2-${node}`}
                        className='input-slider2'
                        type='range' 

                        min={min}
                        max={max}
                        step={step}
                        value={maxValue}

                        onChange={e => slideTwo(e.target.value)}
                        onMouseUp={clickApplyDate}
                    />
                </div>
            </div>
        </div>
    );
};


export default DateFilter;