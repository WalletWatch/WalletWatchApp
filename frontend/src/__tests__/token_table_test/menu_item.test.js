import React from 'react';
import { render, fireEvent, act } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import LastUpdate from '../../components/token_table/menu_item';

describe('LastUpdate component', () => {
  it('renders initial time correctly', () => {
    const { getByText } = render(<LastUpdate value={new Date()} />);
    expect(getByText('0 minutes ago')).toBeInTheDocument();
  });

  it('updates time correctly', () => {
    jest.useFakeTimers(); // Используем фейковые таймеры
    const { getByText } = render(<LastUpdate value={new Date()} />);
    act(() => {
      jest.advanceTimersByTime(5 * 60 * 1000); // Перемотка времени вперед на 5 минут
    });
    expect(getByText('5 minutes ago')).toBeInTheDocument();
    jest.useRealTimers(); // Возвращаем реальные таймеры
  });

  it('clears interval on unmount', () => {
    const clearIntervalMock = jest.spyOn(global, 'clearInterval');
    const { unmount } = render(<LastUpdate value={new Date()} />);
    unmount();
    expect(clearIntervalMock).toHaveBeenCalledTimes(1);
  });
});
