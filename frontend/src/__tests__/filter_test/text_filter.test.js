import React from 'react';
import { shallow, configure } from 'enzyme';
import TextFilter from '../../components/aggrid_filter/filters/text_filter';
import Adapter from 'enzyme-adapter-react-16';

configure({ adapter: new Adapter() });

describe('TextFilter', () => {
    let mockApi;
    let wrapper;

    beforeEach(() => {
        mockApi = {
            forEachNode: jest.fn(),
            setColumnFilterModel: jest.fn().mockResolvedValue(),
            onFilterChanged: jest.fn(),
            addEventListener: jest.fn(),
            removeEventListener: jest.fn(),
            isDestroyed: jest.fn().mockReturnValue(false)
        };

        wrapper = shallow(<TextFilter node="columnName" api={mockApi} />);
    });

    it('renders without crashing', () => {
        expect(wrapper.exists()).toBe(true);
    });

    it('initially checks all checkboxes', () => {
        expect(wrapper.find('#AllParamscolumnName').prop('checked')).toBe(true);
        wrapper.find('.input-cols-filter').forEach(checkbox => {
        expect(checkbox.prop('checked')).toBe(true);
        });
    });

    it('handles checkbox click correctly', () => {
        wrapper.find('#AllParamscolumnName').simulate('change', { target: { checked: false } });
        expect(wrapper.find('#AllParamscolumnName').prop('checked')).toBe(false);

        wrapper.find('.input-cols-filter').forEach(checkbox => {
        expect(checkbox.prop('checked')).toBe(false);
        });
    });

    it('handles search input correctly', () => {
        wrapper.find('#searchercolumnName').simulate('change', { target: { value: 'someValue' } });
        setTimeout(() => {
            expect(mockApi.forEachNode).toHaveBeenCalled();
        }, 1000);
    });

    it('handles apply button click correctly', async () => {
        wrapper.find('.apply-button').at(1).simulate('click', { preventDefault: () => {} });

        setTimeout(() => {
            expect(mockApi.setColumnFilterModel).toHaveBeenCalled();
            expect(mockApi.onFilterChanged).toHaveBeenCalled();
        }, 1000);
    });

    it('handles reset button click correctly', async () => {
        wrapper.find('.apply-button').at(0).simulate('click', { preventDefault: () => {} });

        setTimeout(() => {
            expect(mockApi.setColumnFilterModel).toHaveBeenCalled();
            expect(mockApi.onFilterChanged).toHaveBeenCalled();
        }, 1000);
    });
});
