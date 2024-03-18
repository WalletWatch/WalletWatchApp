import React from 'react';
import { Provider } from 'react-redux';
import { createRoot } from 'react-dom/client';

import App from '../App.tsx';
import { store } from '../store/store.ts';

jest.mock('react-dom/client', () => ({
  createRoot: jest.fn(),
}));

describe('Index', () => {
  beforeEach(() => {
    createRoot.mockClear();
  });

  it('renders without crashing', () => {
    const renderMock = jest.fn();
    const rootInstanceMock = {
      render: renderMock,
    };
    createRoot.mockReturnValue(rootInstanceMock);

    document.body.innerHTML = '<div id="root"></div>'; // Create a root element

    require('../index.js');

    expect(createRoot).toHaveBeenCalledWith(document.getElementById('root'));
    expect(renderMock).toHaveBeenCalledWith(
      <Provider store={store}>
        <App />
      </Provider>
    );
  });
});
