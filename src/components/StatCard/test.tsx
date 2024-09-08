import { describe, expect, it } from 'vitest';
import { render, screen } from '@testing-library/react';
import StatCard from '.';
import { BillType } from '../../types';

const tomorrow: BillType[] = [
  {
    id: 1,
    category: 'Utilities',
    name: 'Electricity',
    amount_due: 75.0,
    due_day: new Date().getTime() + 1,
    is_paid: false
  },
  {
    id: 2,
    category: 'Utilities',
    name: 'Internet',
    amount_due: 50.0,
    due_day: new Date().getTime() + 1,
    is_paid: false
  }
];

const today: BillType[] = [
  {
    id: 1,
    category: 'Utilities',
    name: 'Electricity',
    amount_due: 75.0,
    due_day: new Date().getTime(),
    is_paid: false
  },
  {
    id: 2,
    category: 'Utilities',
    name: 'Internet',
    amount_due: 50.0,
    due_day: new Date().getTime(),
    is_paid: true
  }
];

describe('<StatCard />', () => {
  it('Should display the right heading', () => {
    render(<StatCard title="Today" data={[]} />);
    expect(
      screen.getByRole('heading', {
        name: 'Today'
      })
    ).toBeInTheDocument();
  });

  it('Should display 0 unpaid and paid bills', () => {
    render(<StatCard title="Today" data={[]} />);
    const unpaidBills = screen.getByTestId('unpaid-bills');
    expect(unpaidBills).toHaveTextContent('0 Unpaid');
    const amountUnpaid = screen.getByTestId('amount-unpaid');
    expect(amountUnpaid).toHaveTextContent('$ 0.00');

    const paidBills = screen.getByTestId('paid-bills');
    expect(paidBills).toHaveTextContent('0 Paid');
    const amountPaid = screen.getByTestId('amount-paid');
    expect(amountPaid).toHaveTextContent('$ 0.00');
  });

  it("Should display today's unpaid and paid bills", () => {
    render(<StatCard title="Today" data={today} />);

    const unpaidBills = screen.getByTestId('unpaid-bills');
    expect(unpaidBills).toHaveTextContent('1 Unpaid');
    const amountUnpaid = screen.getByTestId('amount-unpaid');
    expect(amountUnpaid).toHaveTextContent('$ 75.00');

    const paidBills = screen.getByTestId('paid-bills');
    expect(paidBills).toHaveTextContent('1 Paid');
    const amountPaid = screen.getByTestId('amount-paid');
    expect(amountPaid).toHaveTextContent('$ 50.00');
  });

  it("Should display tomorrow's unpaid and paid bills", () => {
    render(<StatCard title="Tomorrow" data={tomorrow} />);

    const unpaidBills = screen.getByTestId('unpaid-bills');
    expect(unpaidBills).toHaveTextContent('2 Unpaid');
    const amountUnpaid = screen.getByTestId('amount-unpaid');
    expect(amountUnpaid).toHaveTextContent('$ 125.00');

    const paidBills = screen.getByTestId('paid-bills');
    expect(paidBills).toHaveTextContent('0 Paid');
    const amountPaid = screen.getByTestId('amount-paid');
    expect(amountPaid).toHaveTextContent('$ 0.00');
  });
});
