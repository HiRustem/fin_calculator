import { DatePickerDirection } from "../../model/type";

import styles from "./DatePickerContent.module.scss";

const months = [
  "Январь",
  "Февраль",
  "Март",
  "Апрель",
  "Май",
  "Июнь",
  "Июль",
  "Август",
  "Сентябрь",
  "Октябрь",
  "Ноябрь",
  "Декабрь",
];

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
        <button onClick={() => handleMonthChange("prev")}>{"<"}</button>
        <span>
          {months[currentMonth]} {currentYear}
        </span>
        <button onClick={() => handleMonthChange("next")}>{">"}</button>
      </div>
      <div className={styles.calendar}>
        <div>
          {["Пн", "Вт", "Ср", "Чт", "Пт", "Сб", "Вс"].map((day) => (
            <span key={day} className="datepicker-day-name">
              {day}
            </span>
          ))}
        </div>
        <div>
          {Array.from({ length: firstDayOfMonth - 1 }).map((_, i) => (
            <span key={`empty-${i}`} className="datepicker-empty" />
          ))}
        </div>
        <div>
          {Array.from({ length: daysInMonth }).map((_, i) => {
            const day = i + 1;
            const isSelected =
              selectedDate.getDate() === day &&
              selectedDate.getMonth() === currentMonth &&
              selectedDate.getFullYear() === currentYear;

            return (
              <button
                key={day}
                className={`datepicker-day ${
                  isSelected ? "datepicker-day-selected" : ""
                }`}
                onClick={() => handleDayClick(day)}
              >
                {day}
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default DatePickerContent;
