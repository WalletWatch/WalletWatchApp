/* eslint-disable */
import React, { useEffect, useState } from 'react';
import "../style.css";

const NumberFilter = (props) => {
    const api = props.api;

    const [min, setMin] = useState();
    const [max, setMax] = useState(0);
    const [inputMin, setInputMin] = useState(0);
    const [inputMax, setInputMax] = useState(0);
    const [minValue, setminValue] = useState(0);
    const [maxValue, setmaxValue] = useState(0);
    const [step, setStep] = useState(1);
    const node = 'balance';

    const modelUpdate = () => {

        let result = [];
        api.forEachNode(elem => {
            result.push(elem.data[node]);
        });
        
        setMax(Math.max(...result));
        setMin(Math.min(...result));

        setInputMin(Math.min(...result));
        setInputMax(Math.max(...result))

        setStep(1 / (10 ** Math.max(...result.map(item => f(item)))))

        setminValue(Math.min(...result));
        setmaxValue(Math.max(...result));
    };

    useEffect(() => {
        modelUpdate();
    }, [api]);

    useEffect(() => {
        props.api.addEventListener('firstDataRendered', modelUpdate);
    
        return () => {
            if (!props.api.isDestroyed()) {
            props.api.removeEventListener('firstDataRendered', modelUpdate);
            }
        };
    }, [api])

    const f = x => ( (x.toString().includes('.')) ? (x.toString().split('.').pop().length) : (0) );

    function slideOne(value){    
        if (Number(value) >= Number(maxValue)) {
            setInputMin(maxValue);
            setminValue(maxValue);
        }
        setInputMin(value);
        setminValue(value);
        fillColor(node);
    }
    
    function slideTwo(value){
        if (Number(value) <= Number(minValue)) {
            setInputMax(minValue);
            setmaxValue(minValue);
        }
        setInputMax(value);
        setmaxValue(value);
        fillColor();
    }
    
    function fillColor() {
        let sliderOne = document.getElementById(`slider-1-${node}`);
        let sliderTwo = document.getElementById(`slider-2-${node}`);
        let sliderTrack = document.querySelector(`.slider-track-${node}`);
    
        let percent1 = ((sliderOne.value - min) / (max - min)) * 100;
        let percent2 = ((sliderTwo.value - min) / (max - min)) * 100;
        
        sliderTrack.style.background = `linear-gradient(to right, #e5e5e5 ${percent1}% , #666666 ${percent1}% , #666666 ${percent2}%, #e5e5e5 ${percent2}%)`;
    }

    function clickApplyNumeric(e) {
        api.setColumnFilterModel(node, {
            operator: 'AND',
            conditions: [
                {
                    filterType: 'number',
                    type: 'greaterThanOrEqual',
                    filter: Number(minValue)
                },
                {
                    filterType: 'number',
                    type: 'lessThanOrEqual',
                    filter: Number(maxValue)
                }
        ]}).then(() => api.onFilterChanged())
    }

    function inputNumeric(event, side) {
        if (event.code === "Enter") {
            let number = Number(event.target.value);
            
            if (!isNaN(number)) {
                if (side === "one") 
                    setNumberInputOne();
                else if (side === "two")
                    setNumberInputTwo();
            }
        }
    }
    function setNumberInputOne() {        
        if (Number(inputMin) >= Number(maxValue)) {
            setminValue(maxValue)
            setInputMin(maxValue);
        } else {
            setminValue(inputMin);
        }

        clickApplyNumeric();
        fillColor();
    }

    function setNumberInputTwo() {
        if (Number(inputMax) <= Number(minValue)) {
            setmaxValue(minValue);
            setInputMax(minValue);
        } else {
            setmaxValue(inputMax);
        }
        clickApplyNumeric();
        fillColor();
    }

    function clickTrack(event) {
        let sliderOne = document.getElementById(`slider-1-${node}`);
        let sliderTwo = document.getElementById(`slider-2-${node}`);
        let displayValOne = document.getElementById(`range1-${node}`);
        let displayValTwo = document.getElementById(`range2-${node}`);

        let dt = (Number(sliderOne.max) - Number(sliderOne.min)) / sliderOne.getBoundingClientRect().width;
        let xStart = event.clientX;

        var onMouseMove = function (evtMove){
            evtMove.preventDefault();
            var xNew = xStart - evtMove.clientX;
            xStart = evtMove.clientX;

            if (sliderOne.value - dt * xNew > sliderOne.min &&
                    sliderTwo.value - dt * xNew < sliderOne.max) {
                sliderOne.value -= dt * xNew;
                sliderTwo.value -= dt * xNew;
            } else {
                if (sliderOne.value - dt * xNew < sliderOne.min) {
                    let delta = sliderOne.value - sliderOne.min;
                    sliderOne.value = sliderOne.min;
                    sliderTwo.value -= delta;
                } else if (sliderTwo.value - dt * xNew > sliderOne.max){
                    let delta = sliderTwo.value - sliderOne.max;
                    sliderTwo.value = sliderOne.max;
                    sliderOne.value -= delta;
                }
            }

            displayValOne.value = sliderOne.value;
            displayValTwo.value = sliderTwo.value;

            setInputMin(sliderOne.value);
            setInputMax(sliderTwo.value);

            setminValue(sliderOne.value);
            setmaxValue(sliderTwo.value);

            fillColor();
        }
        var onMouseUp = function (evtUp){
            document.removeEventListener('mousemove', onMouseMove);
            document.removeEventListener('mouseup', onMouseUp);
            clickApplyNumeric(event)
        }
    
    
        document.addEventListener('mousemove', onMouseMove)
        document.addEventListener('mouseup', onMouseUp)
    }


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
                        className='input-numeric-slider'
                        id={`range1-${node}`}
                        data-testid="range-1"

                        value={inputMin}
                        onChange={event => setInputMin(event.target.value)}
                        onKeyDown={event => inputNumeric(event, "one")}
                        type ='text'
                    >
                    </input>
                    <input 
                        className='input-numeric-slider'
                        style={{textAlign: "end"}}
                        id={`range2-${node}`}
                        data-testid="range-2"

                        value={inputMax}
                        onChange={event => setInputMax(event.target.value)}
                        onKeyDown={event => inputNumeric(event, "two")}
                        type ='text'
                    >
                    </input>
                </div>
                <div className={`container container-${node}`}>
                    <div 
                        className={`slider-track slider-track-${node}`}
                        data-testid="slider-track"
                        style={{background: "#666666"}}
                        onMouseDown={event => clickTrack(event)}
                    ></div>
                    <input 
                        id={`slider-1-${node}`}
                        data-testid="slider-1"
                        className='input-slider1'
                        type='range' 

                        min={min}
                        max={max}
                        step={step}
                        value={minValue}

                        onChange={e => slideOne(e.target.value)}
                        onMouseUp={clickApplyNumeric}
                    />
                    <input 
                        id={`slider-2-${node}`}
                        data-testid="slider-2"
                        className='input-slider2'
                        type='range' 

                        min={min}
                        max={max}
                        step={step}
                        value={maxValue}

                        onChange={e => slideTwo(e.target.value)}
                        onMouseUp={clickApplyNumeric}
                    />
                </div>
            </div>
        </div>
    );
};


export default NumberFilter;