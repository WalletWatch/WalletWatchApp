/* eslint-disable */
import { AgGridReact } from 'ag-grid-react'; 
import "ag-grid-community/styles/ag-grid.css"; 
import "ag-grid-community/styles/ag-theme-quartz.css"; 
import 'ag-grid-enterprise';

import "./TokenTable.css";
import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useEffect, useState, useMemo, useCallback } from "react";
import CustomToolPanel from '../aggridFilter/Filters.js';
import { ValueRenderer, BalanceFormatter, PriceFormatter} from './ValueRenderer.tsx';
import { deleteBalance } from '../../http/balanceApi.ts';
import { removeToken } from '../../store/actions.ts';
import { updateToken } from '../../store/actions.ts';
import { RootState } from '../../store/store.ts';
import LastUpdate from './MenuItem.jsx';


type Token = {
    id: number;
    wallet_name: string;
    asset: string;
    asset_address: string;
    network: string;
    balance: number;
    price: number;
    updated: string;
    createdAt: string;
    wallet_id: number;
}

function TokenTable() {
    const dispatch = useDispatch();
    const balance = useSelector((state: RootState) => state.token);
    const [rowData, setRowData] = useState<Token[]>(balance);

    const columnDefs = [
        { field: 'wallet_name', headerName: 'wallet', cellClass: ['celClass', 'celClassLeft']},
        { field: 'asset', headerName: 'asset', cellClass: ['celClass', 'celClassLeft'] },
        { field: 'network_name', headerName: 'network', cellClass: ['celClass', 'celClassLeft'] },
        { field: 'balance', headerName: 'quantity', filter: 'agNumberColumnFilter', cellRenderer: BalanceFormatter, cellClass: ['celClass', 'celClassLeft'] },
        { field: 'price', headerName: 'price', filter: 'agNumberColumnFilter', cellRenderer: PriceFormatter, cellClass: ['celClass', 'celClassLeft'] },
        {
            field: 'value',
            headerName: "value",
            cellRenderer: ValueRenderer,
            cellClass: ['celClass', 'celClassLeft']
        },
        { 
            field: 'updated', 
            headerName: 'last_update', 
            cellClass: ['celClass', 'celClassRight'], 
            headerClass: "ag-right-aligned-header",
            cellRenderer: LastUpdate
        }
    ];

    const sideBar = useMemo(() => {
        return {
            toolPanels: [
                {
                    id: 'customStats',
                    labelDefault: 'Table Filters',
                    labelKey: 'customStats',
                    iconKey: 'custom-stats',
                    toolPanel: CustomToolPanel,
                    toolPanelParams: {
                        len: rowData.length
                    }
                }
            ]
        }
    } , [rowData])

    const defaultColDef = useMemo(() => {
        return {
          editable: true,
          enableRowGroup: true,
          enablePivot: true,
          enableValue: true,
          sortable: true,
          resizable: true,
          filter: true,
          flex: 1,
          minWidth: 40,
        };
    }, []);

    useEffect(() => {
        
        const chatSocket =  new WebSocket('ws://3f9215732d0c.vps.myjino.ru/ws/wallet/');

        chatSocket.onmessage = function(e:any) {
            const data = JSON.parse(e.data);

            dispatch(updateToken(data.balance));
        }
    }, [])

    useEffect(() => {
        setRowData(balance);
    }, [balance]);

    const formatDate = (params:any) => {
        let date = params.value;
        date = new Date(date);
        let last_update = Date.now() - date;

        let sec = Math.round(last_update / 1000) % 60;
        let mins = Math.round(sec / 60);
        let hours = Math.floor(mins / 60);
        mins %= 60;
        
        let result = ""
        if (hours > 0) result += hours + " hours ";
        if (mins > 0) result += mins + " minutes " 
        if (sec > 0) result = sec + " seconds ago";

        return result;
    }

    const onCellValueChanged = useCallback((params) => {
        params.api.refreshClientSideRowModel();
    }, []);

    const getContextMenuItems = useCallback((params) => {
        return [
          ...(params.defaultItems || []),
          'separator',
          {
            name: 'Delete row',
            action: () => handleClick(params.node.data)
          },
        ];
      }, []);

    const handleClick = (data) => {
        deleteBalance(data.id);
        dispatch(removeToken(data.id));
    }

    return (
        <div className="ag-theme-quartz aggrid">
            <AgGridReact 
                rowData={rowData} 
                columnDefs={columnDefs} 
                getContextMenuItems={getContextMenuItems}
                defaultColDef={defaultColDef}
                sideBar={sideBar}
                suppressMenuHide
                reactiveCustomComponents
                onCellValueChanged={onCellValueChanged}
            />
        </div>
    );
}

export default TokenTable;
