import useCreditCalculatorStore from "@/pages/CreditCalculator/model/store";
import { useShallow } from "zustand/react/shallow";
import { DatePicker } from "..";
import DropdownInputTrigger from "../Dropdown/DropdownInputTrigger/DropdownInputTrigger";
import IconCalendar from "@/assets/calendar.svg?react";
import styles from "./CreditEarlyRepaymentDate.module.scss";
import { getCreditStartDate } from "@/utils/helpers/getFormattedDate";

interface ICreditEarlyRepaymentDate {
  className?: string;
}

const CreditEarlyRepaymentDate = ({ className }: ICreditEarlyRepaymentDate) => {
  const { creditEarlyRepaymentDate, setValue } = useCreditCalculatorStore(
    useShallow((state) => ({
      creditEarlyRepaymentDate: state.creditEarlyRepaymentDate,
      setValue: state.setValue,
    }))
  );

  return (
    <div className={className}>
      <DatePicker
        trigger={
          <DropdownInputTrigger
            label="Дата досрочного погашения"
            selected={creditEarlyRepaymentDate}
            rightIcon={<IconCalendar className={styles.icon} />}
          />
        }
        fullWidthTrigger={true}
        value={creditEarlyRepaymentDate}
        onChange={(newDate) => {
          const formattedDate = getCreditStartDate(newDate);

          setValue("creditEarlyRepaymentDate", formattedDate);
        }}
      />
    </div>
  );
};

export default CreditEarlyRepaymentDate;
