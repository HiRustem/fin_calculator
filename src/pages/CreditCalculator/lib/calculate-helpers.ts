import {
  CreditPartialRepayment,
  CreditPartialRepaymentItem,
  CreditPeriodType,
  CreditRepaymentFrequency,
  IPaymentScheduleItem,
} from "../model/types";

export const getTotalPeriods = ({
  period,
  creditPeriodType,
  creditRepaymentFrequency,
}: IGetTotlaPeriodDto): number => {
  let totalPeriods = creditPeriodType === "года" ? period * 12 : period;

  if (creditRepaymentFrequency === "Ежеквартально") {
    totalPeriods = Math.ceil(totalPeriods / 3);
  }

  return totalPeriods;
};

export const getMonthlyRate = ({
  rate,
  creditRepaymentFrequency,
}: IGetMonthlyRateDto) => {
  return rate / (creditRepaymentFrequency === "Ежемесячно" ? 12 : 4);
};

export const calculateAnnuitySchedule = ({
  amount,
  monthlyRate,
  totalPeriods,
  startDate,
  creditRepaymentFrequency,
  creditRescheduleOnMonday,
  creditEarlyRepayment,
  earlyRepaymentDate,
  creditPartialRepayment,
}: ICalculateScheduleDto): IPaymentScheduleItem[] => {
  const schedule = [];

  const annuity = getAnnuity({
    amount,
    monthlyRate,
    totalPeriods,
  });

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

  const scheduleWithPartialRepayment = getScheduleWithPartialRepayment({
    schedule,
    creditPartialRepaymentArray:
      creditPartialRepayment.creditPartialRepaymentArray,
  });

  return scheduleWithPartialRepayment;
};

const getAnnuity = ({
  amount,
  monthlyRate,
  totalPeriods,
}: IGetAnnuity): number => {
  const annuity =
    (amount * (monthlyRate * Math.pow(1 + monthlyRate, totalPeriods))) /
    (Math.pow(1 + monthlyRate, totalPeriods) - 1);

  return annuity;
};

export const calculateDifferentiatedSchedule = ({
  amount,
  monthlyRate,
  totalPeriods,
  startDate,
  creditRepaymentFrequency,
  creditRescheduleOnMonday,
  creditEarlyRepayment,
  earlyRepaymentDate,
  creditPartialRepayment,
}: ICalculateScheduleDto): IPaymentScheduleItem[] => {
  const schedule: IPaymentScheduleItem[] = [];
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

  const scheduleWithPartialRepayment = getScheduleWithPartialRepayment({
    schedule,
    creditPartialRepaymentArray:
      creditPartialRepayment.creditPartialRepaymentArray,
  });

  return scheduleWithPartialRepayment;
};

const getScheduleWithPartialRepayment = ({
  schedule,
  creditPartialRepaymentArray,
}: IGetScheduleWithPartialRepayment): IPaymentScheduleItem[] => {
  creditPartialRepaymentArray.forEach(
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

interface IGetTotlaPeriodDto {
  period: number;
  creditPeriodType: CreditPeriodType;
  creditRepaymentFrequency: CreditRepaymentFrequency;
}

interface IGetMonthlyRateDto {
  rate: number;
  creditRepaymentFrequency: CreditRepaymentFrequency;
}

interface ICalculateScheduleDto {
  amount: number;
  monthlyRate: number;
  totalPeriods: number;
  startDate: Date;
  creditRepaymentFrequency: CreditRepaymentFrequency;
  creditRescheduleOnMonday: boolean;
  creditEarlyRepayment: boolean;
  earlyRepaymentDate: Date;
  creditPartialRepayment: CreditPartialRepayment;
}

interface IGetAnnuity {
  amount: number;
  monthlyRate: number;
  totalPeriods: number;
}

interface IGetScheduleWithPartialRepayment {
  schedule: IPaymentScheduleItem[];
  creditPartialRepaymentArray: CreditPartialRepaymentItem[];
}
