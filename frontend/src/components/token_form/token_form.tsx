/* eslint-disable */
import "./token_form.css";
import React, { useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useState, useEffect } from "react";
import { createBalance } from "../../http/balance_api.ts";
import Select from "react-select";
import { addToken } from "../../store/actions.ts";
import { RootState } from "../../store/store.ts";
import { fetchNetwork } from "../../http/network.ts";

type TokenFormType = {
    address: string,
    wallet: any,
    network: any,
}

type Wallet = {
    id: number,
    wallet_name: string,
    wallet_address: string,
}

type Network = {
    id: number,
    network: string,
    network_url: string,
    network_ABI: string
}

type Error = {
    address?: string,
    wallet?: string, 
    network?: string
}

function TokenForm() {
    const dispatch = useDispatch();
    const wallets = useSelector((state: RootState) => state.wallet);

    const [token, setToken] = useState<TokenFormType>({address:"", wallet: null, network: null});
    const [errors, setErrors] = useState<Error>({});
    const [submitting, setSubmitting] = useState<boolean>(false);
    const [show, setShow] = useState<boolean>(false);
    const [walletOptions, setWalletOptions] = useState([]);
    const [networkOptions, setNetworkOptions] = useState([]);

    
    const styles = {
        control: (styles, state) => ({ 
            ...styles, 
            fontSize: "13px",
            fontFamily: "'Roboto Mono', monospace;",
            border: '1px solid #e9ecef', 
            margin: "5px",
            marginBottom: "0px",
            boxShadow: 'none',
            cursor: "pointer",
            "&:hover": {
                outline: "0",
                border:  '1px solid #e9ecef',
                boxShadow: "0 0 0 0.1rem rgba(158, 158, 158, 0.25)",
            },
        }),
        option: (provided, state) => ({
            ...provided,
            color: "black",
            backgroundColor: "#fff",

            fontWeight: "normal",
            fontSize: "11px",
            fontFamily: "'Roboto Mono', monospace;",

            cursor: 'pointer',
            border: state.isFocused? '1px solid #e9ecef': "1px solid transparent",
        }),
        singleValue: (provided, state) => ({
            ...provided,
            color: "black",
            fontSize: "11px",
            fontFamily: "'Roboto Mono', monospace;",
            margin: "5px",
        }),
        menu: (provided, state) => ({
            ...provided,
            padding: 0,
            marginTop: "0px",
            width: "calc(100% - 10px)",
            marginLeft: "5px"
        }),
    };

    useEffect(() => {
        let wopt = []

        wopt = wallets.map((item:Wallet) =>{
            return {value: item.id, label: item.wallet_name, color: "black"}
        })
        setWalletOptions(wopt);

        fetchNetwork().then(data => {
            let nopt = [];
            nopt = data.map((item:Network) =>{
                return {value: item.id, label: item.network, color: "black"}
            })

            setNetworkOptions(nopt);
        })
    }, [wallets]);

    useEffect(() => {
        const div = document.querySelector( '#token_form');
        
        function unShowForm(e:any) {
            const withinBoundaries = e.composedPath().includes(div);
        
            if ( ! withinBoundaries ) {
                setShow(false); 
            }
        };

        document.addEventListener( 'click', unShowForm)

        return () => {
            document.removeEventListener('click', unShowForm);
        }
    }, []);

    useEffect(() => {
        if (Object.keys(errors).length === 0 && submitting) {
          finishSubmit();
        }
    }, [errors, submitting]);

    const validateWallet = (inputValues:TokenFormType) => {
        let errors:Error = {};
        if (inputValues.address.length < 10) {
            errors.address = "Address is too short";
        }

        if (inputValues.wallet === null) {
            errors.wallet = "Choose wallet";
        }

        if (inputValues.network === null) {
            errors.network = "Choose network";
        }
    
        return errors;
    };

    const handleClickButton = (e:any) => {
        e.preventDefault();
        setErrors(validateWallet(token));

        setSubmitting(true);
    }

    const finishSubmit = () => {
        const newToken:FormData = new FormData();
        newToken.append('asset_address', token.address);
        newToken.append('wallet_id', String(token.wallet.value));
        newToken.append('network_id', String(token.network.value));

        createBalance(newToken)
            .then((result) => dispatch(addToken(result)))
            .then(() => { setShow(false); setToken({address:"", wallet: null, network: null});})
            .catch((err) => {
                setErrors({address:err.response.data})
            });
        
        setSubmitting(false);
    }

    const clickShowButton = () => {
        setShow(prevState => !prevState);
        setErrors({});
        setToken({address:"", wallet: null, network: null});
        setSubmitting(false);
    }

    return (
        <div id='token_form' style={{position:"relative"}}>
            <button 
                className={
                            show?
                                "wallet_button display_form display_form_show":
                                "wallet_button display_form"
                        }
                onClick={clickShowButton}
            >
                Add token          
            </button>
            <form 
                className="wallet_form"
                style={{display: show?"flex":"none"}}
            >
                <label htmlFor="wallet_address">Token address</label>
                <textarea 
                    id="wallet_address"
                    className="wallet_input" 
                    placeholder="Input Token address..."

                    value={token.address}
                    onChange={e => {
                        setToken({...token, address : e.target.value});
                    }}
                    required
                ></textarea>
                {errors.address ? (
                    <p className="error">{errors.address}</p>
                ) : null}

                <label>Wallet name</label>
                <Select 
                    options={walletOptions} 
                    styles={styles}

                    value={token.wallet}
                    onChange={(choice:any) => setToken({...token, wallet: choice})}
                />
                {errors.wallet ? (
                    <p className="error" style={{marginTop:"5px"}}>{errors.wallet}</p>
                ) : null}

                <label>Network</label>
                <Select 
                    options={networkOptions} 
                    styles={styles}

                    value={token.network}
                    onChange={(choice:any) => setToken({...token, network: choice})}
                />
                {errors.network ? (
                    <p className="error" style={{marginTop:"5px"}}>{errors.network}</p>
                ) : null}

                <button 
                    className="wallet_button"
                    style={{marginTop: "10px"}}
                    onClick={handleClickButton}
                >
                    Add new wallet
                </button>
            </form>
        </div>
    );
}

export default TokenForm;
