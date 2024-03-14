import React from 'react';
import { render, fireEvent, waitFor } from '@testing-library/react';
import TextFilter from '../../components/aggrid_filter/filters/text_filter';

// Mocking the grid API
const mockApi = {
    addEventListener: jest.fn(),
    removeEventListener: jest.fn(),
    isDestroyed: jest.fn().mockReturnValue(false),
    forEachNode: jest.fn(),
    getColumnDefs: jest.fn(),
    getAllDisplayedColumns: jest.fn(),
    setColumnFilterModel: jest.fn().mockResolvedValue(true), // Mocking a successful promise
    onFilterChanged: jest.fn(),
    };

    describe('TextFilter', () => {
    it('renders correctly', () => {
        const { container } = render(<TextFilter api={mockApi} node="test" />);
        expect(container).toMatchSnapshot();
    });

    it('applies filter on button click', async () => {
        // Mocking the values returned by forEachNode
        mockApi.forEachNode.mockImplementationOnce(callback => {
            callback({ displayed: true, data: { test: 'value1' } });
            callback({ displayed: true, data: { test: 'value2' } });
            callback({ displayed: true, data: { test: 'value3' } });
        });

        const { getByText, getByPlaceholderText } = render(<TextFilter api={mockApi} node="test" />);

        // Triggering the filter application
        // fireEvent.click(getByText('Apply'));

        // Expectations
        // expect(mockApi.setColumnFilterModel).toHaveBeenCalledWith('test', { values: ['value1', 'value2', 'value3'] });
        // expect(mockApi.onFilterChanged).toHaveBeenCalled(0);
    });

    // it('resets filter on button click', async () => {
    //     // Mocking the values returned by forEachNode
    //     mockApi.forEachNode.mockImplementationOnce(callback => {
    //     callback({ displayed: true, data: { test: 'value1' } });
    //     callback({ displayed: true, data: { test: 'value2' } });
    //     callback({ displayed: true, data: { test: 'value3' } });
    //     });

    //     const { getByText } = render(<TextFilter api={mockApi} node="test" />);

    //     // Triggering the filter reset
    //     fireEvent.click(getByText('Reset'));

    //     // Expectations
    //     expect(mockApi.setColumnFilterModel).toHaveBeenCalledWith('test', { values: ['value1', 'value2', 'value3'] });
    //     expect(mockApi.onFilterChanged).toHaveBeenCalled();
    // });
});
