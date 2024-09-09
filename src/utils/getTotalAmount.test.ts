import { describe, expect, test } from 'vitest';
import getTotalAmount from './getTotalAmount';
import { BillType } from '../types';

const bills: BillType[] = [
  {
    id: 1,
    category: 'Utilities',
    name: 'Electricity',
    amountDue: 75.0,
    dueDay: 1,
    is_paid: false
  },
  {
    id: 2,
    category: 'Utilities',
    name: 'Internet',
    amountDue: 50.0,
    dueDay: 2,
    is_paid: false
  }
];

describe('Get total amount', () => {
  test('Total amout', () => {
    const unpaidAmount = getTotalAmount(bills);
    expect(unpaidAmount).toBe(125);
  });
});
