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
import { BillType } from '../../types';

function createData(
  id: number,
  name: string,
  due_day: number,
  is_paid: boolean,
  category: string,
  amount_due?: number | null
): BillType {
  return { id, name, due_day, amount_due, is_paid, category };
}

const data = [
  createData(1, 'Light', 2, true, 'Utilities', 60.0),
  createData(2, 'Water', 3, true, 'Utilities', 90.0),
  createData(3, 'Internet', 6, false, 'Utilities', 30.0),
  createData(4, 'Kids school', 10, false, 'Utilities', 1200),
  createData(5, 'Credit card', 20, false, 'Utilities', null)
];

describe('<BillsTable />', () => {
  beforeAll(() => {
    const mockDate = new Date(2024, 7, 7);
    vi.setSystemTime(mockDate);
  });

  beforeEach(() => {
    render(<BillsTable bills={data} />);
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
