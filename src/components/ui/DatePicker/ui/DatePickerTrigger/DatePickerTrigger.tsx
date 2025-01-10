interface IDatePickerTrigger {
  selectedDate: Date;
}

const DatePickerTrigger = ({ selectedDate, ...props }: IDatePickerTrigger) => {
  return (
    <div {...props}>
      {selectedDate.toLocaleDateString("ru-RU", {
        year: "numeric",
        month: "long",
        day: "numeric",
      })}
    </div>
  );
};

export default DatePickerTrigger;
