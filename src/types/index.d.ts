import { Categories } from './common';

export interface BillType {
  id: number;
  name: string;
  amount_due?: string | null;
  due_day: number;
  is_paid: boolean;
  category: Categories;
}
