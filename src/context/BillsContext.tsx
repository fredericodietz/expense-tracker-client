import React, { createContext, ReactNode, useContext, useState } from 'react';
import { BillType } from '../types';

interface BillContextType {
  bills: BillType[];
  initBills: (bills: BillType[]) => void;
  addBill: (bill: BillType) => void;
  deleteBill: (id: number) => void;
  markAsPaid: (id: number) => void;
  updateBill: (bill: BillType) => void;
}

export const BillsContext = createContext<BillContextType | undefined>(
  undefined
);

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

  const deleteBill = (id: number) => {
    setBills((prev) => prev.filter((b) => b.id !== id));
  };

  const markAsPaid = (id: number): void => {
    setBills((prev) => {
      const billsList = [...prev];
      const paidBillIndex = billsList.findIndex((b) => b.id === id);
      if (paidBillIndex) {
        billsList[paidBillIndex].is_paid = true;
      }
      return billsList;
    });
  };

  const updateBill = (updatedBill: BillType): void => {
    setBills((prev) => {
      const billsList = [...prev];
      const oldBillIndex = billsList.findIndex((b) => b.id === updatedBill.id);
      if (oldBillIndex) {
        billsList[oldBillIndex] = updatedBill;
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
