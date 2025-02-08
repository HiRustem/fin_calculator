import { CreditPartialType } from "@/pages/CreditCalculator/model/types";
import { getCreditStartDate } from "@/utils/helpers/getFormattedDate";
import { RegisterOptions } from "react-hook-form";

export const creditCalculatorDefaultValues = {
  creditAmount: "100000",
  creditPercent: "5",
  creditPeriod: "3",
  creditStart: getCreditStartDate(new Date()),
  creditOneTimeCommission: "0",
  creditMounthlyCommission: "0",
  creditRescheduleOnMonday: false,
  creditEarlyRepayment: false,
  creditEarlyRepaymentDate: getCreditStartDate(new Date()),
  creditPartialRepayment: {
    creditPartialRepaymentArray: [],
    creditPartialType: "с сохранением суммы платежа" as CreditPartialType,
  },
};

export const creditAmountRules: RegisterOptions = {
  required: {
    value: true,
    message: "Это обязательное поле",
  },
  pattern: {
    value: /^[0-9]{1,}$/,
    message: "Невалидное значение",
  },
};

export const creditPercentRules: RegisterOptions = {
  required: {
    value: true,
    message: "Это обязательное поле",
  },
};

export const createPercentMask = (rawValue: string) => {
  const numbers = rawValue.replace(/\D/g, "");

  const afterCommaLength = numbers.length > 2 ? 2 : numbers.length;
  let beforeCommaLength = numbers.length - afterCommaLength;

  if (beforeCommaLength < 1) beforeCommaLength = 1;
  if (beforeCommaLength > 3) beforeCommaLength = 3;

  const beforeComma = new Array(beforeCommaLength).fill(/\d/);
  const afterComma = new Array(2).fill(/\d/);

  return [...beforeComma, ",", ...afterComma];
};

export const percentPipe = (conformedValue: string) => {
  return conformedValue.replace(/_/g, "0");
};

export const creditAmountOptions = ["₽", "$", "€"];
