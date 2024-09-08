import { Categories } from './common';

export interface BillData {
  name: string;
  amount_due?: number | null;
  due_day: number;
  is_paid: boolean;
  category: Categories;
}

export type BillType = BillData & {
  id: number;
};
