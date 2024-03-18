import React from 'react';
import { render, screen, act } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import ColsFilter from '../../components/aggrid_filter/filters/cols_filter';


describe('ColsFilter', () => {
    let mockApi;

    beforeEach(() => {
        mockApi = {
            getAllDisplayedColumns: jest.fn().mockReturnValue([
                { userProvidedColDef: { headerName: 'Column 1' }, colId: 'col1' },
                { userProvidedColDef: { headerName: 'Column 2' }, colId: 'col2' }
            ]),
            getColumnDefs: jest.fn().mockReturnValue([
                { field: 'col1', hide: false },
                { field: 'col2', hide: false }
            ]),
            setGridOption: jest.fn(),
            isDestroyed: jest.fn().mockReturnValue(false),
            addEventListener: jest.fn(),
            removeEventListener: jest.fn()
        };
    });

    it('renders correctly', () => {
        const { container } = render(
            <ColsFilter api={mockApi} />
        );

        expect(container).toMatchSnapshot();
    });

    it('handles checkbox click correctly', () => {
        render(<ColsFilter api={mockApi} />);

        const allCheckboxes = screen.getAllByRole('checkbox');
        allCheckboxes.forEach((checkbox) => {
            expect(checkbox).toBeChecked(); 
        });

        const allColsCheckbox = screen.getByTestId('AllCols');
        act(() => {
            userEvent.click(allColsCheckbox);
        });

        allCheckboxes.forEach((checkbox) => {
            expect(checkbox).not.toBeChecked(); 
        });
    });

    it('handle click apply correctly', () => {
        render(<ColsFilter api={mockApi} />);

        const allCheckboxes = screen.getAllByRole('checkbox');
        act(() => {
            userEvent.click(allCheckboxes[1]);
        });
        
        act(() => {
            userEvent.click(screen.getByTestId('apply'))
        });

        setTimeout(() => {
            expect(mockApi.setGridOption).toHaveBeenCalledWith([{ field: 'col2', hide: false }]);
        }, 1000);
    });

    it('handle click apply correctly', () => {
        render(<ColsFilter api={mockApi} />);

        const allCheckboxes = screen.getAllByRole('checkbox');
        act(() => {
            userEvent.click(allCheckboxes[1]);
        });
        act(() => {
            userEvent.click(screen.getByTestId('reset'))
        });
        setTimeout(() => {
            expect(allCheckboxes[1]).toBeChecked(); 
        }, 1000);
    });

    it('handle click search correctly', () => {
        render(<ColsFilter api={mockApi}/>);

        const search = screen.getByPlaceholderText('Search for cols...');
        act(() => {
            userEvent.type(search, 'COLUMN 1');
        });
        const allCheckboxes = screen.getAllByRole('checkbox');
        expect(allCheckboxes.length).toBe(1);
    });
});



