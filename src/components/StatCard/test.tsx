import { describe, expect, it } from 'vitest';
import { render, screen } from '@testing-library/react';
import StatCard from '.';
import { Stats } from '../../types';
import { Categories } from '../../types/common';

const TODAY = new Date();
const TOMORROW = new Date(TODAY);
TOMORROW.setDate(TOMORROW.getDate() + 1);

const tomorrow: Stats = {
  paid: [
    {
      id: 1,
      category: Categories.Utilities,
      name: 'Phone',
      amountDue: '75.0',
      dueDay: TOMORROW.getDate(),
      Payments: [
        {
          id: 1,
          amountPaid: 75,
          paymentDate: TODAY.toISOString(),
          billId: 1
        }
      ]
    }
  ],
  unpaid: [
    {
      id: 2,
      category: Categories.Utilities,
      name: 'Electricity',
      amountDue: '75.0',
      dueDay: TOMORROW.getDate(),
      Payments: []
    },
    {
      id: 3,
      category: Categories.Utilities,
      name: 'Internet',
      amountDue: '50.0',
      dueDay: TOMORROW.getDate(),
      Payments: []
    }
  ]
};

const today: Stats = {
  paid: [
    {
      id: 1,
      category: Categories.Utilities,
      name: 'Phone',
      amountDue: '50.0',
      dueDay: TODAY.getDate(),
      Payments: [
        {
          id: 1,
          amountPaid: 50,
          paymentDate: TODAY.toISOString(),
          billId: 1
        }
      ]
    }
  ],
  unpaid: [
    {
      id: 1,
      category: Categories.Utilities,
      name: 'Electricity',
      amountDue: '75.0',
      dueDay: TODAY.getDate(),
      Payments: []
    }
  ]
};

describe('<StatCard />', () => {
  it('Should display the right heading', () => {
    render(<StatCard title="Today" data={today} />);
    expect(
      screen.getByRole('heading', {
        name: 'Today'
      })
    ).toBeInTheDocument();
  });

  it('Should display 0 unpaid and paid bills', () => {
    render(<StatCard title="Today" data={{ paid: [], unpaid: [] }} />);
    const unpaidBills = screen.getByTestId('today-unpaid-bills');
    expect(unpaidBills).toHaveTextContent('0 Unpaid');
    const amountUnpaid = screen.getByTestId('today-amount-unpaid');
    expect(amountUnpaid).toHaveTextContent('$ 0.00');

    const paidBills = screen.getByTestId('today-paid-bills');
    expect(paidBills).toHaveTextContent('0 Paid');
    const amountPaid = screen.getByTestId('today-amount-paid');
    expect(amountPaid).toHaveTextContent('$ 0.00');
  });

  it("Should display today's unpaid and paid bills", () => {
    render(<StatCard title="Today" data={today} />);

    const unpaidBills = screen.getByTestId('today-unpaid-bills');
    expect(unpaidBills).toHaveTextContent('1 Unpaid');
    const amountUnpaid = screen.getByTestId('today-amount-unpaid');
    expect(amountUnpaid).toHaveTextContent('$ 75.00');

    const paidBills = screen.getByTestId('today-paid-bills');
    expect(paidBills).toHaveTextContent('1 Paid');
    const amountPaid = screen.getByTestId('today-amount-paid');
    expect(amountPaid).toHaveTextContent('$ 50.00');
  });

  it("Should display tomorrow's unpaid and paid bills", () => {
    render(<StatCard title="Tomorrow" data={tomorrow} />);

    const unpaidBills = screen.getByTestId('tomorrow-unpaid-bills');
    expect(unpaidBills).toHaveTextContent('2 Unpaid');
    const amountUnpaid = screen.getByTestId('tomorrow-amount-unpaid');
    expect(amountUnpaid).toHaveTextContent('$ 125.00');

    const paidBills = screen.getByTestId('tomorrow-paid-bills');
    expect(paidBills).toHaveTextContent('1 Paid');
    const amountPaid = screen.getByTestId('tomorrow-amount-paid');
    expect(amountPaid).toHaveTextContent('$ 75.00');
  });
});
