import { ReactNode, useState } from "react";
import { DatePickerDirection } from "./model/type";
import Dropdown from "../Dropdown/Dropdown";
import { DatePickerContent } from "./ui";
import IconCalendar from "@/assets/calendar.svg?react";

import styles from "./DatePicker.module.scss";
import { getISOFormattedString } from "./lib/getISOFormattedString";

interface IDatePicker {
  value: string;
  onChange: (newDate: Date) => void;
  trigger?: ReactNode;
  triggerClassName?: string;
  fullWidthTrigger?: boolean;
}

const Datepicker = ({
  value,
  onChange,
  trigger,
  triggerClassName,
  fullWidthTrigger,
}: IDatePicker) => {
  const [selectedDate, setSelectedDate] = useState(
    new Date(getISOFormattedString(value))
  );
  const [currentYear, setCurrentYear] = useState(selectedDate.getFullYear());
  const [currentMonth, setCurrentMonth] = useState(selectedDate.getMonth());
  const [isOpen, setIsOpen] = useState(false);

  const handleDayClick = (day: number) => {
    const newDate = new Date(currentYear, currentMonth, day);
    setSelectedDate(newDate);
    onChange?.(newDate);
    setIsOpen(false);
  };

  const handleMonthChange = (direction: DatePickerDirection) => {
    if (direction === "prev") {
      const newMonth = currentMonth === 0 ? 11 : currentMonth - 1;
      const newYear = currentMonth === 0 ? currentYear - 1 : currentYear;
      setCurrentMonth(newMonth);
      setCurrentYear(newYear);
    } else {
      const newMonth = currentMonth === 11 ? 0 : currentMonth + 1;
      const newYear = currentMonth === 11 ? currentYear + 1 : currentYear;
      setCurrentMonth(newMonth);
      setCurrentYear(newYear);
    }
  };

  return (
    <Dropdown
      isOpen={isOpen}
      setIsOpen={setIsOpen}
      trigger={
        trigger ? (
          trigger
        ) : (
          <div className={styles.trigger}>
            <div className={styles.iconWrapper}>
              <IconCalendar className={styles.icon} />
            </div>
          </div>
        )
      }
      fullWidthTrigger={fullWidthTrigger}
      triggerClassName={triggerClassName}
      content={
        <DatePickerContent
          selectedDate={selectedDate}
          currentMonth={currentMonth}
          currentYear={currentYear}
          handleDayClick={handleDayClick}
          handleMonthChange={handleMonthChange}
        />
      }
      align="center"
      side="bottom"
      sideOffset={5}
    />
  );
};

export default Datepicker;
