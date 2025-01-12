import { DatePickerDirection } from "../../model/type";

import IconChevronLeft from "@/assets/chevron-left.svg?react";
import IconChevronRight from "@/assets/chevron-right.svg?react";

import styles from "./DatePickerContent.module.scss";
import clsx from "clsx";
import { months } from "../../model/consts";

interface IDatePickerContent {
  selectedDate: Date;
  currentMonth: number;
  currentYear: number;
  handleDayClick: (day: number) => void;
  handleMonthChange: (direction: DatePickerDirection) => void;
}

const DatePickerContent = ({
  selectedDate,
  currentMonth,
  currentYear,
  handleDayClick,
  handleMonthChange,
}: IDatePickerContent) => {
  const daysInMonth = new Date(currentYear, currentMonth + 1, 0).getDate();
  const firstDayOfMonth = new Date(currentYear, currentMonth, 1).getDay();

  return (
    <div className={styles.container}>
      <div className={styles.monthPicker}>
        <button
          className={styles.monthButton}
          onClick={() => handleMonthChange("prev")}
        >
          <IconChevronLeft className={styles.arrow} />
        </button>
        <span className={styles.month}>
          {months[currentMonth]} {currentYear}
        </span>
        <button
          className={styles.monthButton}
          onClick={() => handleMonthChange("next")}
        >
          <IconChevronRight className={styles.arrow} />
        </button>
      </div>

      <div className={styles.calendar}>
        <div className={styles.weekDaysList}>
          {["Пн", "Вт", "Ср", "Чт", "Пт", "Сб", "Вс"].map((day) => (
            <span key={day} className={styles.weekDay}>
              {day}
            </span>
          ))}
        </div>

        <div className={styles.daysContainer}>
          <div className={styles.days}>
            {Array.from({ length: firstDayOfMonth - 1 }).map((_, i) => (
              <span key={`empty-${i}`} className={styles.emptyDay} />
            ))}
            {Array.from({ length: daysInMonth }).map((_, i) => {
              const day = i + 1;
              const isSelected =
                selectedDate.getDate() === day &&
                selectedDate.getMonth() === currentMonth &&
                selectedDate.getFullYear() === currentYear;

              return (
                <button
                  key={day}
                  className={clsx(styles.dayItem, {
                    [styles.selected]: isSelected,
                  })}
                  onClick={() => handleDayClick(day)}
                >
                  {day}
                </button>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
};

export default DatePickerContent;
