import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import NumberFilter from '../../components/aggrid_filter/filters/number_filter';

describe('NumberFilter', () => {
    let mockApi;

    beforeEach(() => {
        const mockDataArray = [
            { data: {'balance': 23}, displayed: true },
            { data: {'balance': 0}, displayed: true },
            { data: {'balance': 201}, displayed: true },
        ];

        mockApi = {
            forEachNode: jest.fn(callback => {
                mockDataArray.forEach(data => callback(data));
            }),
            setColumnFilterModel: jest.fn().mockResolvedValue(),
            onFilterChanged: jest.fn(),
            addEventListener: jest.fn(),
            removeEventListener: jest.fn(),
            isDestroyed: jest.fn().mockReturnValue(false)
        };
    });

    it('renders correctly', () => {
        render(<NumberFilter api={mockApi} />);
        expect(screen.getByText('balance')).toBeInTheDocument();
        expect(screen.getByTestId('slider-1')).toBeInTheDocument();
        expect(screen.getByTestId('slider-2')).toBeInTheDocument();
    });

    test('updates on API data change', () => {
        const { rerender } = render(<NumberFilter api={mockApi} />);

        expect(screen.getByTestId('range-1').value).toBe("0");
        expect(screen.getByTestId('range-2').value).toBe("201");

        let newMockData = [
            { data: {'balance': 45}, displayed: true },
            { data: {'balance': 90}, displayed: true },
            { data: {'balance': 16}, displayed: true },
        ];
        let newMockApi = {
            forEachNode: jest.fn(callback => {
                newMockData.forEach(data => callback(data));
            }),
            setColumnFilterModel: jest.fn().mockResolvedValue(),
            onFilterChanged: jest.fn(),
            addEventListener: jest.fn(),
            removeEventListener: jest.fn(),
            isDestroyed: jest.fn().mockReturnValue(false)
        };

        rerender(<NumberFilter api={newMockApi} />);
        expect(screen.getByTestId('range-1').value).toBe("16");
        expect(screen.getByTestId('range-2').value).toBe("90");
    });

    test('sliding range sliders updates state', () => {
        render(<NumberFilter api={mockApi} />);
        const slider1 = screen.getByTestId('slider-1');
        const slider2 = screen.getByTestId('slider-2');
      
        fireEvent.change(slider1, { target: { value: 50 }});
        fireEvent.change(slider2, { target: { value: 70 }});
      
        expect(slider1).toHaveValue("50");
        expect(slider2).toHaveValue("70");
      });
      
    test('input validation works as expected', () => {
        render(<NumberFilter api={mockApi} />);
        const input1 = screen.getByTestId('range-1');
        const slider1 = screen.getByTestId('slider-1');
        const input2 = screen.getByTestId('range-1');
        const slider2 = screen.getByTestId('slider-2');

        fireEvent.change(input1, { target: { value: 'abc' }});
        fireEvent.keyPress(input1, { key: 'Enter', code: 'Enter' });
      
        expect(slider1).toHaveValue('0');

        fireEvent.change(input2, { target: { value: 'abc' }});
        fireEvent.keyPress(input2, { key: 'Enter', code: 'Enter' });
      
        expect(slider2).toHaveValue('201');
    });

    test('applying filter updates API filter model', async () => {
        render(<NumberFilter api={mockApi} />);
      
        fireEvent.change(screen.getByTestId('slider-1'), { target: { value: 20 }});
        fireEvent.mouseUp(screen.getByTestId('slider-1'));
      
        await waitFor(() => expect(mockApi.setColumnFilterModel).toHaveBeenCalledWith('balance', {
                operator: 'AND',
                conditions: [
                    { filterType: 'number', type: 'greaterThanOrEqual', filter: 20 },
                    { filterType: 'number', type: 'lessThanOrEqual', filter: 201 }
                ]
            })
        );

        fireEvent.change(screen.getByTestId('slider-2'), { target: { value: 80 }});
        fireEvent.mouseUp(screen.getByTestId('slider-2'));

        await waitFor(() => expect(mockApi.setColumnFilterModel).toHaveBeenCalledWith('balance', {
                operator: 'AND',
                conditions: [
                    { filterType: 'number', type: 'greaterThanOrEqual', filter: 20 },
                    { filterType: 'number', type: 'lessThanOrEqual', filter: 80 }
                ]
            })
        );

        await waitFor(() => expect(mockApi.onFilterChanged).toHaveBeenCalled());
      });      
      
});



