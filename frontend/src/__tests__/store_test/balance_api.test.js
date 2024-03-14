import axios from 'axios';
import { fetchBalance, createBalance, fetchOneBalance, deleteBalance } from '../../http/balance_api';

// Мокируем библиотеку axios
jest.mock('axios');

describe('API Functions', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  it('fetchBalance function should return data', async () => {
    const mockData = [{ id: 1, amount: 100 }];
    axios.get.mockResolvedValueOnce({ data: { data: mockData } });
    const result = await fetchBalance();
    expect(result).toEqual(mockData);
  });

  it('createBalance function should return data', async () => {
    const mockBalance = { amount: 100 };
    const mockData = { id: 1, amount: 100 };
    axios.post.mockResolvedValueOnce({ data: mockData });
    const result = await createBalance(mockBalance);
    expect(result).toEqual(mockData);
  });

  it('fetchOneBalance function should return data', async () => {
    const mockData = { id: 1, amount: 100 };
    axios.get.mockResolvedValueOnce({ data: mockData });
    const result = await fetchOneBalance(1);
    expect(result).toEqual(mockData);
  });

  it('deleteBalance function should return data', async () => {
    const mockData = { success: true };
    axios.delete.mockResolvedValueOnce({ data: mockData });
    const result = await deleteBalance(1);
    expect(result).toEqual(mockData);
  });
});
