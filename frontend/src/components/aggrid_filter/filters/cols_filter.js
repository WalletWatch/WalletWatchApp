/* eslint-disable */
import React, { useEffect, useRef, useState } from 'react';
import "../style.css";

const ColsFilter = (props) => {
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
        let columns = api.getAllDisplayedColumns().map((item) => {
            return {
                value: item.userProvidedColDef.headerName,
                column: item.colId,
                checked: true
            }
        });

        setValues(columns);
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
        let cols = values && values.map(element => {
            if (element.checked)
                return  element.column;
        })

        cols = Array.from(cols);

        const columnDefs = api.getColumnDefs()
        columnDefs.forEach((colDef) => {
            if (cols.includes(colDef.field)) {
                colDef.hide = false;
            } else {
                colDef.hide = true;
            }
        });

        api.setGridOption('columnDefs', columnDefs);
        event.preventDefault();
    }

    function clickResetRow(event) {
        const columnDefs = api.getColumnDefs()
        columnDefs.forEach((colDef) => {
            colDef.hide = false;
        });

        let updatedCheckedState = values.map((item) => {
            return {
                ...item,
                checked: true
            }
        });

        setAll(true);
        setValues(updatedCheckedState);

        api.setGridOption('columnDefs', columnDefs);
        event.preventDefault();
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
        <div 
            className='column-filter'
            id='ag-cols'
        >
            <div style={{overflow: "hidden", height: "150px"}}>
                <input 
                    id='searcherCols' 
                    className='title' 
                    type='text' 
                    placeholder='Search for cols...'

                    value={search}
                    onChange={e => setSearch(e.target.value)}
                    onInput={inputSearch}
                />
                <div 
                    id='searchCols'
                    className='column-filter-wrapper' 
                    style={{height: "calc(100% - 28px)"}} 
                    ref={ref}
                >
                    <div className='column-filter-item'>
                        <input 
                            id='AllCols' 
                            data-testid="AllCols"
                            className='input-cols-filter' 
                            type='checkbox' 

                            value={all} 
                            onChange={clickAll}
                            checked={all}
                        />
                        <label 
                            className='input-column-name' 
                            htmlFor='AllCols'
                        >
                            (All)
                        </label>
                    </div>
                    {values && values.map((item, indx) => {
                        return <div key={indx} className='column-filter-item'>
                            <input 
                                id={item.value} 
                                className='input-cols-filter' 
                                key={indx}
                                type='checkbox'  

                                value={item.value}
                                checked={item.checked}
                                onChange={handleOnChange} 
                            />
                            <label className='input-column-name' htmlFor={item.value}>
                                {item.value.toLocaleUpperCase()}
                            </label>
                        </div>
                    })}
                </div>
            </div>
            <div className='apply-button-wrapper'>
                <button
                    className='apply-button' 
                    data-testid="reset"

                    onClick={clickResetRow}
                >   
                    Reset
                </button>
                <button 
                    className='apply-button' 
                    data-testid="apply"
                    style={{marginLeft: "5px"}}

                    onClick={clickHandleFilter}
                >
                    Apply
                </button>
            </div>
        </div>
    )
}

export default ColsFilter;