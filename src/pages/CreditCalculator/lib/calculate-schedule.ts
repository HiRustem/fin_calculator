import { ICreditCalculatorStoreState } from "../model/store";

type PaymentScheduleItem = {
  date: string;
  payment: number;
  interest: number;
  principal: number;
  remainingDebt: number;
};

const calculateCreditSchedule = (
  state: ICreditCalculatorStoreState
): PaymentScheduleItem[] => {
  const {
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
  } = state;

  let amount = parseFloat(creditAmount);
  const rate = parseFloat(creditPercent) / 100;
  const period = parseInt(creditPeriod);
  const startDate = new Date(creditStart);
  const earlyRepaymentDate = new Date(creditEarlyRepaymentDate);

  let totalPeriods = creditPeriodType === "года" ? period * 12 : period;
  if (creditRepaymentFrequency === "Ежеквартально") {
    totalPeriods = Math.ceil(totalPeriods / 3);
  }

  const monthlyRate =
    rate / (creditRepaymentFrequency === "Ежемесячно" ? 12 : 4);
  let schedule: PaymentScheduleItem[] = [];

  if (creditRepaymentProcedure === "Аннуитентый") {
    const annuity =
      (amount * (monthlyRate * Math.pow(1 + monthlyRate, totalPeriods))) /
      (Math.pow(1 + monthlyRate, totalPeriods) - 1);

    for (let i = 0; i < totalPeriods; i++) {
      const interest = amount * monthlyRate;
      const principal = annuity - interest;
      amount -= principal;

      const paymentDate = new Date(startDate);
      paymentDate.setMonth(
        paymentDate.getMonth() +
          i * (creditRepaymentFrequency === "Ежеквартально" ? 3 : 1)
      );

      if (creditRescheduleOnMonday) {
        while (paymentDate.getDay() !== 1) {
          paymentDate.setDate(paymentDate.getDate() + 1);
        }
      }

      schedule.push({
        date: paymentDate.toISOString().split("T")[0],
        payment: annuity,
        interest,
        principal,
        remainingDebt: Math.max(amount, 0),
      });

      if (creditEarlyRepayment && paymentDate >= earlyRepaymentDate) {
        break;
      }
    }
  } else {
    const principalPayment = amount / totalPeriods;

    for (let i = 0; i < totalPeriods; i++) {
      const interest = amount * monthlyRate;
      const payment = principalPayment + interest;
      amount -= principalPayment;

      const paymentDate = new Date(startDate);
      paymentDate.setMonth(
        paymentDate.getMonth() +
          i * (creditRepaymentFrequency === "Ежеквартально" ? 3 : 1)
      );

      if (creditRescheduleOnMonday) {
        while (paymentDate.getDay() !== 1) {
          paymentDate.setDate(paymentDate.getDate() + 1);
        }
      }

      schedule.push({
        date: paymentDate.toISOString().split("T")[0],
        payment,
        interest,
        principal: principalPayment,
        remainingDebt: Math.max(amount, 0),
      });

      if (creditEarlyRepayment && paymentDate >= earlyRepaymentDate) {
        break;
      }
    }
  }

  // Обработка частичных погашений
  creditPartialRepayment.creditPartialRepaymentArray.forEach(
    ({ creditPartialRepaymentDate, creditPartialRepaymentSum }) => {
      const repaymentDate = new Date(creditPartialRepaymentDate);
      const repaymentSum = parseFloat(creditPartialRepaymentSum);
      schedule = schedule.map((item) => {
        if (new Date(item.date) >= repaymentDate) {
          item.remainingDebt -= repaymentSum;
        }
        return item;
      });
    }
  );

  return schedule;
};

export default calculateCreditSchedule;
