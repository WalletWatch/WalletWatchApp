export type Token = {
    id: number;
    wallet_name: string;
    asset: string;
    asset_address: string;
    network: string;
    balance: number;
    price: number;
    delta: number;
    track: boolean;
    updated: string;
    createdAt: string;
    wallet_id: number;
}

export type Wallet = {
    id: number;
    wallet_name: string;
    wallet_address: string;
    wallet_sum: number
}

export type Alert = {
  asset?: string,
  wallet: string,
  balance: number,
  network?: string,
  updated: string
}