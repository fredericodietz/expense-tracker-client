import { BillType } from '../types';

export default function getTotalAmount(bills: BillType[]): number {
  return bills.reduce(
    (total, current) => (total += parseFloat(current?.amount_due || '0')),
    0
  );
}
