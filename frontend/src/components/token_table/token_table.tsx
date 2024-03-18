/* eslint-disable */
import { AgGridReact } from 'ag-grid-react'; 
import "ag-grid-community/styles/ag-grid.css"; 
import "ag-grid-community/styles/ag-theme-quartz.css"; 
import 'ag-grid-enterprise';
import {
    ColDef,
    GetRowIdParams,
    ModuleRegistry
  } from "@ag-grid-community/core";
import { ClientSideRowModelModule } from "@ag-grid-community/client-side-row-model";
ModuleRegistry.registerModules([ClientSideRowModelModule]);

import "./token_table.css";
import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useEffect, useState, useMemo, useCallback } from "react";
import CustomToolPanel from '../aggrid_filter/filters.js';
import { BalanceFormatter, PriceFormatter} from './value_renderer.tsx';
import { updateBalance } from '../../http/balance_api.ts';
import { addToken, updateWallet } from '../../store/actions.ts';
import { updateToken } from '../../store/actions.ts';
import { RootState } from '../../store/store.ts';
import LastUpdate from './menu_item.jsx';
import { Token } from '../../types/index.ts';

function TokenTable() {
    const dispatch = useDispatch();
    const balance:Token[] = useSelector((state: RootState) => state.token);
    
    const getRowId = useCallback((params: GetRowIdParams) => params.data.id, []);

    const [columnDefs, setColumnDefs] = useState<ColDef[]>([
        { field: 'wallet_name', headerName: 'wallet', cellClass: ['celClass', 'celClassLeft']},
        { field: 'asset', headerName: 'asset', cellClass: ['celClass', 'celClassLeft'] },
        { field: 'network_name', headerName: 'network', cellClass: ['celClass', 'celClassLeft'] },
        { field: 'balance', headerName: 'quantity', filter: 'agNumberColumnFilter', cellRenderer: BalanceFormatter, cellClass: ['celClass', 'celClassLeft'] },
        { field: 'price', headerName: 'price', filter: 'agNumberColumnFilter', cellRenderer: PriceFormatter, cellClass: ['celClass', 'celClassLeft'] },
        {
            field: 'value',
            headerName: "value",
            filter: 'agNumberColumnFilter',
            cellRenderer: PriceFormatter,
            cellClass: ['celClass', 'celClassLeft']
        },
        { 
            field: 'updated', 
            headerName: 'last_update', 
            cellClass: ['celClass', 'celClassRight'], 
            headerClass: "ag-right-aligned-header",
            cellRenderer: LastUpdate
        }
    ]);

    // const sideBar = useMemo(() => {
    //     return {
    //         toolPanels: [
    //             {
    //                 id: 'customStats',
    //                 labelDefault: 'Table Filters',
    //                 labelKey: 'customStats',
    //                 iconKey: 'custom-stats',
    //                 toolPanel: CustomToolPanel,
    //                 toolPanelParams: {
    //                     len: balance.length
    //                 }
    //             }
    //         ]
    //     }
    // } , [balance])

    const defaultColDef = useMemo<ColDef>(() => {
        return {
          editable: false,
          enableRowGroup: true,
          enablePivot: true,
          enableValue: true,
          sortable: true,
          resizable: true,
          filter: true,
          flex: 1,
          minWidth: 40,
        }
    }, []);

    useEffect(() => {
        const chatSocket =  new WebSocket(`wss://gryumova.ru/ws/wallet/`);
    
        chatSocket.onmessage = function(e:any) {
            const data = JSON.parse(e.data);
            
            if (data.balance) {
                if (data.update === true)
                    dispatch(updateToken(data.balance));
                else dispatch(addToken(data.balance));
            }
            if (data.wallet) {
                dispatch(updateWallet(data.wallet));
            }
        }
    }, [])

    // useEffect(() => {
    //     setRowData(balance);
    // }, [balance]);

    const getContextMenuItems = useCallback((params) => {
        return [
          ...(params.defaultItems || []),
          'separator',
          {
            name: params.node.data.track? 'Untrack': "Track",
            action: () => trackClick(params.node.data)
          },
          {
            name: 'Change Delta',
            action: () => changeDelta(params.node.data)
          }
        ];
    }, []);

    const trackClick = (data) => {
        let new_data = {...data, track: !data.track};

        dispatch(updateToken(new_data));
        updateBalance(new_data);
    }

    const changeDelta = (data) => {
        const value = prompt("Enter new delta value:") || "";
        const delta = parseFloat(value);
        if (!isNaN(delta)) {
            let new_data = {...data, track: !data.track};
            dispatch(updateToken(new_data));
            updateBalance(new_data);
        } else {
            alert("Input correct value!")
        }
    }

    return (
        <div className="ag-theme-quartz aggrid">
            <AgGridReact 
                rowData={balance} 
                columnDefs={columnDefs} 

                getContextMenuItems={getContextMenuItems}
                defaultColDef={defaultColDef}
                getRowId={getRowId}
                // sideBar={sideBar}
                suppressMenuHide
            />
        </div>
    );
}

export default TokenTable;
