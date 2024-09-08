import { BillType } from '../types';

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

const seedData: BillType[] = [
  createData(1, 'Light', 2, true, 'Utilities', 60.0),
  createData(2, 'Water', 3, true, 'Utilities', 90.0),
  createData(3, 'Internet', 6, false, 'Utilities', 30.0),
  createData(4, 'Kids school', new Date().getDate(), false, 'Education', 1200),
  createData(5, 'Car', new Date().getDate() + 1, false, 'Transport', 500),
  createData(6, 'Rent', 12, false, 'House', 1200),
  createData(7, 'Health insurance', 13, false, 'Insurance', 100),
  createData(8, 'Credit card', 20, false, 'Shopping', null)
];

export default seedData;
