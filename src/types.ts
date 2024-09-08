export interface BillType {
  id: number;
  name: string;
  amount_due?: number | null;
  due_day: number;
  is_paid: boolean;
  category: string;
}
