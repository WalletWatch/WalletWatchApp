import React from 'react';
import { render } from '@testing-library/react';
import { ValueRenderer, BalanceFormatter, PriceFormatter } from '../../components/token_table/value_renderer';

describe('ValueRenderer', () => {
  it('renders formatted value correctly', () => {
    const data = { price: 10, balance: 5 };
    const { getByText } = render(<ValueRenderer data={data} />);
    expect(getByText('$50')).toBeInTheDocument();
  });
});

describe('BalanceFormatter', () => {
  it('renders formatted balance correctly', () => {
    const { getByText } = render(<BalanceFormatter value={1000000} />);
    expect(getByText('1M')).toBeInTheDocument();
  });
});

describe('PriceFormatter', () => {
  it('renders formatted price correctly', () => {
    const { getByText } = render(<PriceFormatter value={15.6789} />);
    expect(getByText('$15.6789')).toBeInTheDocument();
  });
});
