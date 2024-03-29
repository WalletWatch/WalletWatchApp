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

type Wallet = {
    id: number;
    wallet_name: string;
    wallet_address: string;
}

type Alert = {
  asset: string,
  wallet: string,
  balance: number,
  price: number,
  updated: string
}

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

function updateWallet(wallets: Wallet[]) {
  return {
    type: 'UPDATE_WALLET',
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

export { addWallet, addToken, removeToken, removeWallet, updateAllToken, updateToken, updateWallet, addAlert, updateAlert };