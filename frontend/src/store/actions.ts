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

export { addWallet, addToken, removeToken, removeWallet, updateAllToken, updateToken };