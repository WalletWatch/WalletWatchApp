import React from 'react';
import { render, screen, act } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import TextFilter from '../../components/aggrid_filter/filters/text_filter';


describe('TextFilter', () => {
    let mockApi;

    beforeEach(() => {
        const mockDataArray = [
            { data: {'node': "wallet"}, displayed: true },
            { data: {'node': "test"}, displayed: true },
            { data: {'node': "wallet-test"}, displayed: true },
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
        const { container } = render(
            <TextFilter api={mockApi} />
        );

        expect(container).toMatchSnapshot();
    });

    it('handles checkbox click correctly', () => {
        render(<TextFilter api={mockApi} />);

        const allCheckboxes = screen.getAllByRole('checkbox');
        allCheckboxes.forEach((checkbox) => {
            expect(checkbox).toBeChecked(); 
        });

        const allColsCheckbox = screen.getByTestId('AllParams');
        act(() => {
            userEvent.click(allColsCheckbox);
        });

        allCheckboxes.forEach((checkbox) => {
            expect(checkbox).not.toBeChecked(); 
        });
    });

    it('handle click apply correctly', () => {
        render(<TextFilter api={mockApi} />);

        const allCheckboxes = screen.getAllByRole('checkbox');
        act(() => {
            userEvent.click(allCheckboxes[1]);
        });
        
        act(() => {
            userEvent.click(screen.getByTestId('Apply'))
        });

        setTimeout(() => {
            expect(mockApi.setColumnFilterModel).toHaveBeenCalledWith('node', { values: ["test", "wallet-test"]});
        }, 1000);
    });

    it('handle click apply correctly', () => {
        render(<TextFilter api={mockApi} node/>);

        const allCheckboxes = screen.getAllByRole('checkbox');
        act(() => {
            userEvent.click(allCheckboxes[1]);
        });
        act(() => {
            userEvent.click(screen.getByTestId('Reset'))
        });
        setTimeout(() => {
            expect(allCheckboxes[1]).toBeChecked(); 
        }, 1000);
    });

    it('handle click search correctly', () => {
        render(<TextFilter api={mockApi} node='node'/>);

        const search = screen.getByPlaceholderText('Search for node...');
        act(() => {
            userEvent.type(search, 'test');
        });

        const allCheckboxes = screen.getAllByRole('checkbox');
        expect(allCheckboxes.length).toBe(2);
    });
});



