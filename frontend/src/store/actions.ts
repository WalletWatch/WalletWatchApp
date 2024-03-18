import { Wallet, Token, Alert } from "../types";

function addWallet(wallet: Wallet) {
    return {
      type: 'ADD_WALLET',
      payload: wallet,
    };
}

function removeWallet(id: number) {
    return {
      type: 'REMOVE_WALLET',
      payload: id,
    };
}

function updateWallet(wallet: Wallet) {
  return {
    type: 'UPDATE_WALLET',
    payload: wallet
  }
}

function updateAllWallet(wallets: Wallet[]) {
  return {
    type: 'UPDATE_ALL_WALLET',
    payload: wallets
  }
}

function addToken(token: Token) {
    return {
      type: 'ADD_TOKEN',
      payload: token,
    };
}

function updateAllToken(tokens: Token[]) {
  return {
    type: 'UPDATE_ALL_TOKEN',
    payload: tokens,
  };
}

function updateToken(token: Token) {
  return {
    type: 'UPDATE_TOKEN',
    payload: token,
  };
}

function removeToken(id: number) {
    return {
      type: 'REMOVE_TOKEN',
      payload: id,
    };
}

function addAlert(alert: Alert) {
  return {
    type: 'ADD_ALERT',
    payload: alert
  }
}

function updateAlert(alerts: Alert[]) {
  return {
    type: 'UPDATE_ALL_ALERT',
    payload: alerts
  }
}

export { 
  addToken, removeToken, removeWallet, updateAllToken, updateToken, 
  addWallet, updateWallet, updateAllWallet,
  addAlert, updateAlert 
};