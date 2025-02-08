import { getCreditStartDate } from "@/utils/helpers/getFormattedDate";
import { DatePicker } from "..";
import DropdownInputTrigger from "../Dropdown/DropdownInputTrigger/DropdownInputTrigger";
import useCreditCalculatorStore from "@/pages/CreditCalculator/model/store";
import { useShallow } from "zustand/react/shallow";
import IconCalendar from "@/assets/calendar.svg?react";

import styles from "./CreditStartDropdown.module.scss";

interface ICreditStartDropdown {
  className?: string;
}

const CreditStartDropdown = ({ className }: ICreditStartDropdown) => {
  const { creditStart, setValue } = useCreditCalculatorStore(
    useShallow((state) => ({
      creditStart: state.creditStart,
      setValue: state.setValue,
    }))
  );

  return (
    <div className={className}>
      <DatePicker
        trigger={
          <DropdownInputTrigger
            label="Дата выдачи"
            selected={creditStart}
            rightIcon={<IconCalendar className={styles.icon} />}
          />
        }
        fullWidthTrigger={true}
        value={creditStart}
        onChange={(newDate) => {
          const formattedDate = getCreditStartDate(newDate);

          setValue("creditStart", formattedDate);
        }}
      />
    </div>
  );
};

export default CreditStartDropdown;
