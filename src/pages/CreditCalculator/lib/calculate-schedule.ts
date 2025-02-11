import { CalculateCreditSchedule, IPaymentScheduleItem } from "../model/types";
import {
  calculateAnnuitySchedule,
  calculateDifferentiatedSchedule,
  getMonthlyRate,
  getTotalPeriods,
} from "./calculate-helpers";

const calculateCreditSchedule = ({
  creditAmount,
  creditPercent,
  creditPeriod,
  creditPeriodType,
  creditRepaymentProcedure,
  creditRepaymentFrequency,
  creditRescheduleOnMonday,
  creditEarlyRepayment,
  creditEarlyRepaymentDate,
  creditPartialRepayment,
  creditStart,
}: CalculateCreditSchedule): IPaymentScheduleItem[] => {
  const amount = parseFloat(creditAmount);
  const rate = parseFloat(creditPercent) / 100;
  const period = parseInt(creditPeriod);
  const startDate = new Date(creditStart);
  const earlyRepaymentDate = new Date(creditEarlyRepaymentDate);

  const totalPeriods = getTotalPeriods({
    period,
    creditPeriodType,
    creditRepaymentFrequency,
  });

  const monthlyRate = getMonthlyRate({
    rate,
    creditRepaymentFrequency,
  });

  if (creditRepaymentProcedure === "Аннуитентый") {
    const annuitySchedule = calculateAnnuitySchedule({
      amount,
      monthlyRate,
      totalPeriods,
      startDate,
      creditRepaymentFrequency,
      creditRescheduleOnMonday,
      creditEarlyRepayment,
      earlyRepaymentDate,
      creditPartialRepayment,
    });

    return annuitySchedule;
  } else {
    const differentiatedSchedule = calculateDifferentiatedSchedule({
      amount,
      monthlyRate,
      totalPeriods,
      startDate,
      creditRepaymentFrequency,
      creditRescheduleOnMonday,
      creditEarlyRepayment,
      earlyRepaymentDate,
      creditPartialRepayment,
    });

    return differentiatedSchedule;
  }
};

export default calculateCreditSchedule;
