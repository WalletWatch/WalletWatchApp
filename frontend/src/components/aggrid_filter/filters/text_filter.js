/* eslint-disable */
import React, { useEffect, useRef, useState } from 'react';
import "../style.css";

const TextFilter = (props) => {
    const node = props.node;
    const api = props.api;
    const [search, setSearch] = useState("");
    const [values, setValues] = useState([]);
    const [all, setAll] = useState(true);

    const ref = useRef(null);

    useEffect(() => {
        gridReady();
    }, [api]);

    useEffect(() => {
        api.addEventListener('firstDataRendered', gridReady);
    
        return () => {
            if (!api.isDestroyed()) {
                api.removeEventListener('firstDataRendered', gridReady);
            }
        };
    }, [api]);

    function gridReady() {
        let result = [];
        api.forEachNode(elem => {
            if (elem.displayed === true) {
                result.push(elem.data[node]);
            }
        });
        result = [...new Set(result)];
        setValues(result.map((item) => {
            return {
                value: item,
                checked: true
            }
        }))
    }

    const handleOnChange = (e) => {
        const updatedCheckedState = values.map((item) => {
            if (item.value === e.target.value) 
                return {
                    ...item,
                    checked: !item.checked
                };
            return item
        });

        setAll(false);
        setValues(updatedCheckedState);
    };

    const clickAll = (e) => {
        let updatedCheckedState = [];
        if (e.target.checked === false) {
            setAll(false)
            updatedCheckedState = values.map((item) => {
                return {
                    ...item,
                    checked: false
                }
            })
        } else {
            setAll(true)
            updatedCheckedState = values.map((item) => {
                return {
                    ...item,
                    checked: true
                }
            })
        }

        setValues(updatedCheckedState);
    }

    function clickHandleFilter(event) {  
        let checked = values.map((item) => {
            if (item.checked)
                return item.value
        });

        api.setColumnFilterModel(node, { 
            values: checked
        }).then(() => api.onFilterChanged());
        
        event.preventDefault();
    }

    function clickResetRow(event) {
        event.preventDefault();

        let updatedCheckedState = values.map((item) => {
            return {
                ...item,
                checked: true
            }
        })
    
        let checked = values.map((item) => {
            return item.value
        });
    
        api.setColumnFilterModel(node, { 
            values: checked
        }).then(() => api.onFilterChanged());

        setAll(true);
        setValues(updatedCheckedState);
    }

    function inputSearch(event) {
        if (event.target.value.length > 0) {
            ref.current.childNodes.forEach(element => {
                let htmlValue = element.lastChild.innerHTML.toLowerCase();
                let eventValue = event.target.value.toLowerCase();

                if (htmlValue.indexOf(eventValue) !== -1) {
                    element.style.display = "flex";
                } else {
                    element.style.display = "none";
                }
            });
        } else {
            ref.current.childNodes.forEach(element => {
                element.style.display = "flex";
            });
        };
    }
        

    return (
        <div className='column-filter' id={node}>
            <div style={{overflow: "hidden", height: "150px"}}>
                <input 
                    id={`searcher${node}`} 
                    className='title' 
                    type='text' 
                    placeholder={`Search for ${node}...`}

                    value={search}
                    onChange={e => setSearch(e.target.value)}
                    onInput={e => inputSearch(e)}
                />
                <div 
                    id={`search${node}`}
                    className='column-filter-wrapper' 
                    style={{height: "calc(100% - 28px)"}} 
                    ref={ref}
                >
                    <div className='column-filter-item'>
                        <input 
                            id={`AllParams${node}`} 
                            data-testid="AllParams"
                            className='input-cols-filter' 
                            type='checkbox' 

                            value={all} 
                            onChange={clickAll}
                            checked={all}
                        />
                        <label 
                            htmlFor={`AllParams${node}`} 
                            className='input-column-name'
                        >
                            (All)
                        </label>
                    </div>
                    {values && values.map((item) => {
                        return (
                            <div 
                                key={item.value}
                                className='column-filter-item'
                            >
                                <input 
                                    id={item.value} 
                                    className='input-cols-filter' 
                                    type='checkbox'  

                                    value={item.value}
                                    checked={item.checked}
                                    onChange={handleOnChange} 
                                />
                                <label htmlFor={item.value} className='input-column-name'>
                                    {item.value}
                                </label>
                            </div>
                        )
                    })}
                </div>
            </div>
            <div className='apply-button-wrapper'>
                <button 
                    className='apply-button' 
                    data-testid="Reset"

                    onClick={clickResetRow}
                >
                    Reset
                </button>
                <button 
                    className='apply-button' 
                    data-testid="Apply"
                    style={{marginLeft: "5px"}}

                    onClick={clickHandleFilter}
                >
                    Apply
                </button>
            </div>
        </div>
    )
}

export default TextFilter;