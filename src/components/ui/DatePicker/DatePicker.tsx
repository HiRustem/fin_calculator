import { useState } from "react";
import { DatePickerDirection } from "./model/type";
import Dropdown from "../Dropdown/Dropdown";
import { DatePickerContent } from "./ui";

interface IDatePicker {
  value: Date;
  onChange: (newDate: Date) => void;
}

const Datepicker = ({ value, onChange }: IDatePicker) => {
  const today = new Date();
  const [selectedDate, setSelectedDate] = useState(value || today);
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
        <button>
          {selectedDate.toLocaleDateString("ru-RU", {
            year: "numeric",
            month: "long",
            day: "numeric",
          })}
        </button>
      }
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
