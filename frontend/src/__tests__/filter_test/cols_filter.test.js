import React from 'react';
import { shallow, configure } from 'enzyme';
import ColsFilter from '../../components/aggrid_filter/filters/cols_filter';

import Adapter from 'enzyme-adapter-react-16';

configure({ adapter: new Adapter() });

describe('ColsFilter', () => {
    let mockApi;
    let wrapper;

    beforeEach(() => {
        // Создаем мок API для передачи в компонент
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

        wrapper = shallow(<ColsFilter api={mockApi} />);
    });

    it('renders correctly', () => {
        expect(wrapper).toMatchSnapshot();
    });

    it('handles checkbox click correctly', () => {
        expect(wrapper.find('#AllCols').prop('checked')).toBe(true);
        wrapper.find('#AllCols').simulate('change', { target: { checked: false } });
        expect(wrapper.find('#AllCols').prop('checked')).toBe(false);
    });
});
