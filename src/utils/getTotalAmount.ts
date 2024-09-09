import { BillType } from '../types';

export default function getTotalAmount(bills: BillType[]): number {
  return bills.reduce(
    (total, current) => (total += parseFloat(current?.amountDue || '0')),
    0
  );
}
