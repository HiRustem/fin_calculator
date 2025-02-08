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
