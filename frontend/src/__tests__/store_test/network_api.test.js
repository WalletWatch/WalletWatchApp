import axios from 'axios';
import { fetchNetwork, fetchOneNetwork, deleteNetwork } from '../../http/network';

// Мокируем библиотеку axios
jest.mock('axios');

describe('API Functions', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  it('fetchNetwork function should return data', async () => {
    const mockData = [{ id: 1, name: 'Test Network' }];
    axios.get.mockResolvedValueOnce({ data: { data: mockData } });
    const result = await fetchNetwork();
    expect(result).toEqual(mockData);
  });

  it('fetchOneNetwork function should return data', async () => {
    const mockData = { id: 1, name: 'Test Network' };
    axios.get.mockResolvedValueOnce({ data: mockData });
    const result = await fetchOneNetwork(1);
    expect(result).toEqual(mockData);
  });

  it('deleteNetwork function should return data', async () => {
    const mockData = { success: true };
    axios.delete.mockResolvedValueOnce({ data: mockData });
    const result = await deleteNetwork(1);
    expect(result).toEqual(mockData);
  });
});
