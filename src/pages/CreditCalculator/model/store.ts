import { creditCalculatorDefaultValues } from "@/components/CreditCalculatorForm/model/consts";
import { create } from "zustand";
import { immer } from "zustand/middleware/immer";
import {
  CalculatorCurrency,
  CalculatorType,
  CreditPartialRepayment,
  CreditPartialRepaymentItem,
  CreditPartialType,
  CreditPeriodType,
  CreditRepaymentFrequency,
  CreditRepaymentProcedure,
} from "./types";
import { getCreditStartDate } from "@/utils/helpers/getFormattedDate";

export type ICreditCalculatorStoreState = {
  calculatorType: CalculatorType;
  creditCurrency: CalculatorCurrency;
  creditPeriodType: CreditPeriodType;
  creditRepaymentProcedure: CreditRepaymentProcedure;
  creditRepaymentFrequency: CreditRepaymentFrequency;
  creditRescheduleOnMonday: boolean;
  creditEarlyRepayment: boolean;
  creditEarlyRepaymentDate: string;
  creditPartialRepayment: CreditPartialRepayment;
  creditAmount: string;
  creditPercent: string;
  creditPeriod: string;
  creditStart: string;
  creditOneTimeCommission: string;
  creditMounthlyCommission: string;
};

type ICreditCalculatorStoreActions = {
  setValue: <K extends keyof ICreditCalculatorStoreState>(
    fieldName: K,
    fieldValue: ICreditCalculatorStoreState[K]
  ) => void;
  getValue: <K extends keyof ICreditCalculatorStoreState>(
    fieldName: K
  ) => ICreditCalculatorStoreState[K];
  addPartialRepayment: () => void;
  deletePartialRepayment: (id: number) => void;
  setPartialRepayment: (id: number, date: string, sum: string) => void;
  setCreditPartialRepaymentType: (value: CreditPartialType) => void;
};

const creditCalculatorDefaultState: ICreditCalculatorStoreState = {
  calculatorType: "creditSum",
  creditCurrency: "₽",
  creditPeriodType: "года",
  creditRepaymentProcedure: "Дифференцированный",
  creditRepaymentFrequency: "Ежемесячно",
  ...creditCalculatorDefaultValues,
};

const useCreditCalculatorStore = create<
  ICreditCalculatorStoreState & ICreditCalculatorStoreActions
>()(
  immer((set, get) => ({
    setValue: (fieldName, fieldValue) => {
      set({ [fieldName]: fieldValue });
    },
    getValue: (fieldName) => {
      return get()[fieldName];
    },
    addPartialRepayment: () => {
      const newCreditPartialRepayment = get().creditPartialRepayment;
      const newCreditPartialRepaymentArray = [
        ...newCreditPartialRepayment.creditPartialRepaymentArray,
      ];

      const newCreditPartialRepaymentArrayItem: CreditPartialRepaymentItem = {
        id: newCreditPartialRepaymentArray.length,
        creditPartialRepaymentDate: getCreditStartDate(new Date()),
        creditPartialRepaymentSum: "0",
      };

      newCreditPartialRepaymentArray.push(newCreditPartialRepaymentArrayItem);

      newCreditPartialRepayment.creditPartialRepaymentArray =
        newCreditPartialRepaymentArray;

      set({ creditPartialRepayment: { ...newCreditPartialRepayment } });
    },
    deletePartialRepayment: (id) => {
      const newPartialRepayment = get().creditPartialRepayment;
      const newPartialRepaymentArray = [
        ...newPartialRepayment.creditPartialRepaymentArray,
      ];

      const filteredArray = newPartialRepaymentArray.filter(
        (item) => item.id !== id
      );

      newPartialRepayment.creditPartialRepaymentArray = filteredArray;

      set({ creditPartialRepayment: { ...newPartialRepayment } });
    },
    setPartialRepayment: (id, date, sum) => {
      const newCreditPartialRepayment = get().creditPartialRepayment;
      const newCreditPartialRepaymentArray = [
        ...newCreditPartialRepayment.creditPartialRepaymentArray,
      ];

      newCreditPartialRepaymentArray[id].creditPartialRepaymentDate = date;
      newCreditPartialRepaymentArray[id].creditPartialRepaymentSum = sum;

      newCreditPartialRepayment.creditPartialRepaymentArray =
        newCreditPartialRepaymentArray;

      set({ creditPartialRepayment: { ...newCreditPartialRepayment } });
    },
    setCreditPartialRepaymentType: (value) => {
      const newCreditPartialRepayment = get().creditPartialRepayment;

      newCreditPartialRepayment.creditPartialType = value;

      set({ creditPartialRepayment: newCreditPartialRepayment });
    },
    ...creditCalculatorDefaultState,
  }))
);

export default useCreditCalculatorStore;
