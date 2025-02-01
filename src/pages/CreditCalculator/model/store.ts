import { creditCalculatorDefaultValues } from "@/components/CreditCalculatorForm/model/consts";
import { create } from "zustand";

import { immer } from "zustand/middleware/immer";
import {
  CalculatorCurrency,
  CalculatorType,
  CreditPeriodType,
  CreditRepaymentFrequency,
  CreditRepaymentProcedure,
} from "./types";

type ICreditCalculatorStoreState = {
  calculatorType: CalculatorType;
  creditCurrency: CalculatorCurrency;
  creditPeriodType: CreditPeriodType;
  creditRepaymentProcedure: CreditRepaymentProcedure;
  creditRepaymentFrequency: CreditRepaymentFrequency;
  creditAmount: string;
  creditPercent: string;
  creditPeriod: string;
  creditStart: string;
};

type ICreditCalculatorStoreActions = {
  setValue: <K extends keyof ICreditCalculatorStoreState>(
    fieldName: K,
    fieldValue: ICreditCalculatorStoreState[K]
  ) => void;
  getValue: <K extends keyof ICreditCalculatorStoreState>(
    fieldName: K
  ) => ICreditCalculatorStoreState[K];
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
    ...creditCalculatorDefaultState,
  }))
);

export default useCreditCalculatorStore;
