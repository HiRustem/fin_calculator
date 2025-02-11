import { ICreditCalculatorStoreState } from "./store";

export type CalculatorType = "creditSum" | "creditPay";

export type CalculatorCurrency = "₽" | "$" | "€";

export type CreditPeriodType = "месяца" | "года";

export type CreditRepaymentProcedure = "Дифференцированный" | "Аннуитентый";

export type CreditRepaymentFrequency = "Ежемесячно" | "Ежеквартально";

export interface CreditPartialRepayment {
  creditPartialRepaymentArray: CreditPartialRepaymentItem[];
  creditPartialType: CreditPartialType;
}

export interface CreditPartialRepaymentItem {
  id: number;
  creditPartialRepaymentDate: string;
  creditPartialRepaymentSum: string;
}

export type CreditPartialType =
  | "с сохранением суммы платежа"
  | "с сохранением срока кредита";

export interface IPaymentScheduleItem {
  date: string;
  payment: number;
  interest: number;
  principal: number;
  remainingDebt: number;
}

export type CalculateCreditSchedule = Pick<
  ICreditCalculatorStoreState,
  | "creditAmount"
  | "creditPercent"
  | "creditPeriod"
  | "creditPeriodType"
  | "creditRepaymentProcedure"
  | "creditRepaymentFrequency"
  | "creditRescheduleOnMonday"
  | "creditEarlyRepayment"
  | "creditEarlyRepaymentDate"
  | "creditPartialRepayment"
  | "creditStart"
>;
