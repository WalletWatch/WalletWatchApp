import axios from 'axios';
import { fetchWallet, createWallet, fetchOneWallet, deleteWallet } from '../../http/wallet_api';

// Мокируем библиотеку axios
jest.mock('axios');

describe('API Functions', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  it('fetchWallet function should return data', async () => {
    const mockData = [{ id: 1, wallet_name: 'Test Wallet' }];
    axios.get.mockResolvedValueOnce({ data: { data: mockData } });
    const result = await fetchWallet();
    expect(result).toEqual(mockData);
  });

  it('createWallet function should return data', async () => {
    const mockWallet = { wallet_name: 'Test Wallet' };
    const mockData = { id: 1, wallet_name: 'Test Wallet' };
    axios.post.mockResolvedValueOnce({ data: mockData });
    const result = await createWallet(mockWallet);
    expect(result).toEqual(mockData);
  });

  it('fetchOneWallet function should return data', async () => {
    const mockData = { id: 1, wallet_name: 'Test Wallet' };
    axios.get.mockResolvedValueOnce({ data: mockData });
    const result = await fetchOneWallet(1);
    expect(result).toEqual(mockData);
  });

  it('deleteWallet function should return data', async () => {
    const mockData = { success: true };
    axios.delete.mockResolvedValueOnce({ data: mockData });
    const result = await deleteWallet(1);
    expect(result).toEqual(mockData);
  });
});
