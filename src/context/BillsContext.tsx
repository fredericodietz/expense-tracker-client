import React, { createContext, ReactNode, useContext, useState } from 'react';
import { BillType } from '../types';

interface BillContextType {
  bills: BillType[];
  initBills: (bills: BillType[]) => void;
  addBill: (bill: BillType) => void;
  deleteBill: (bill: BillType) => void;
  markAsPaid: (bill: BillType) => void;
  updateBill: (bill: BillType) => void;
}

const BillsContext = createContext<BillContextType | undefined>(undefined);

export const BillsProvider: React.FC<{ children: ReactNode }> = ({
  children
}) => {
  const [bills, setBills] = useState<BillType[]>([]);

  const initBills = (allBills: BillType[]): void => {
    setBills(allBills);
  };

  const addBill = (bill: BillType): void => {
    setBills((prev) => [...prev, bill]);
  };

  const deleteBill = (bill: BillType) => {
    setBills((prev) => prev.filter((b) => b.id !== bill.id));
  };

  const markAsPaid = (bill: BillType): void => {
    setBills((prev) => {
      const billsList = [...prev];
      const paidBill = billsList.find((b) => b.id === bill.id);
      if (paidBill) {
        paidBill.is_paid = true;
      }
      return billsList;
    });
  };

  const updateBill = (bill: BillType): void => {
    setBills((prev) => {
      const billsList = [...prev];
      let paidBill = billsList.find((b) => b.id === bill.id);
      if (paidBill) {
        paidBill = { ...bill };
      }
      return billsList;
    });
  };

  return (
    <BillsContext.Provider
      value={{ bills, initBills, addBill, deleteBill, markAsPaid, updateBill }}>
      {children}
    </BillsContext.Provider>
  );
};

export const useBillsContext = () => {
  const context = useContext(BillsContext);
  if (context === undefined) {
    throw new Error('useBillsContext must be used within a BillsProvider');
  }
  return context;
};
