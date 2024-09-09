import {
  afterAll,
  beforeAll,
  beforeEach,
  describe,
  expect,
  it,
  vi
} from 'vitest';
import { render, screen } from '@testing-library/react';
import BillsTable from '.';
import { BillType, Payment } from '../../../types';
import { Categories } from '../../../types/common';
import { BillsContext } from '../../../context/BillsContext';

function createData(
  id: number,
  name: string,
  dueDay: number,
  category: Categories,
  Payments: Payment[],
  amountDue?: string | null
): BillType {
  return { id, name, dueDay, amountDue, Payments, category };
}

const statsObj = {
  late: {
    paid: [],
    unpaid: []
  },
  today: {
    paid: [],
    unpaid: []
  },
  tomorrow: {
    paid: [],
    unpaid: []
  },
  week: {
    paid: [],
    unpaid: []
  }
};

describe('<BillsTable />', () => {
  beforeAll(() => {
    const mockDate = new Date(2024, 7, 7);
    vi.setSystemTime(mockDate);
  });
  beforeEach(() => {
    const TODAY = new Date();
    const data = [
      createData(
        1,
        'Light',
        2,
        Categories.Utilities,
        [
          {
            id: 1,
            amountPaid: 60,
            paymentDate: TODAY.toISOString(),
            billId: 1
          }
        ],
        '60.0'
      ),
      createData(
        2,
        'Water',
        3,
        Categories.Utilities,
        [
          {
            id: 1,
            amountPaid: 90,
            paymentDate: TODAY.toISOString(),
            billId: 2
          }
        ],
        '90.0'
      ),
      createData(3, 'Internet', 6, Categories.Utilities, [], '30.0'),
      createData(4, 'Kids school', 10, Categories.Utilities, [], '1200'),
      createData(5, 'Credit card', 20, Categories.Utilities, [], '')
    ];

    render(
      <BillsContext.Provider
        value={{
          bills: data,
          initBills: () => false,
          addBill: () => false,
          deleteBill: () => false,
          markAsPaid: () => false,
          updateBill: () => false,
          stats: statsObj
        }}>
        <BillsTable />
      </BillsContext.Provider>
    );
  });

  afterAll(() => {
    vi.useRealTimers();
  });

  it('Should display 5 bills', () => {
    const billCells = screen.getAllByTestId('bill-tablecell');
    expect(billCells.length).toBe(5);
  });

  it('Should display 2 paid bills', () => {
    const billCells = screen.getAllByTestId('status-paid');
    expect(billCells.length).toBe(2);
  });

  it('Should display 2 unpaid bills', () => {
    const billCells = screen.getAllByTestId('status-unpaid');
    expect(billCells.length).toBe(2);
  });

  it('Should display 1 late bill', () => {
    const billCells = screen.getAllByTestId('status-late');
    expect(billCells.length).toBe(1);
  });
});
