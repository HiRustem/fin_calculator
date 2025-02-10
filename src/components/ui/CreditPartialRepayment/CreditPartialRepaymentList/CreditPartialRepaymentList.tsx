import useCreditCalculatorStore from "@/pages/CreditCalculator/model/store";
import { Button, DatePicker } from "../..";
import DropdownInputTrigger from "../../Dropdown/DropdownInputTrigger/DropdownInputTrigger";
import IconCalendar from "@/assets/calendar.svg?react";
import { getCreditStartDate } from "@/utils/helpers/getFormattedDate";
import { useShallow } from "zustand/react/shallow";
import Input from "../../Input/Input";
import { ChangeEvent } from "react";
import IconCross from "@/assets/cross.svg?react";

import styles from "./CreditPartialRepaymentList.module.scss";

const CreditPartialRepaymentList = () => {
  const {
    creditPartialRepayment,
    setPartialRepayment,
    deletePartialRepayment,
  } = useCreditCalculatorStore(
    useShallow((state) => ({
      creditPartialRepayment: state.creditPartialRepayment,
      setPartialRepayment: state.setPartialRepayment,
      deletePartialRepayment: state.deletePartialRepayment,
    }))
  );

  return (
    <ul className={styles.list}>
      {creditPartialRepayment.creditPartialRepaymentArray.map((item) => (
        <li key={item.id} className={styles.item}>
          <div className={styles.datePicker}>
            <DatePicker
              trigger={
                <DropdownInputTrigger
                  label="Дата частичного погашения"
                  selected={item.creditPartialRepaymentDate}
                  rightIcon={<IconCalendar className={styles.icon} />}
                />
              }
              fullWidthTrigger={true}
              value={item.creditPartialRepaymentDate}
              onChange={(newDate) => {
                const formattedDate = getCreditStartDate(newDate);

                setPartialRepayment(
                  item.id,
                  formattedDate,
                  item.creditPartialRepaymentSum
                );
              }}
            />
          </div>

          <div className={styles.input}>
            <Input
              label="Сумма частичного погашения"
              value={item.creditPartialRepaymentSum}
              onChange={(event: ChangeEvent<HTMLInputElement>) => {
                const formattedValue = event.target.value.replace(/^0+/, "");

                setPartialRepayment(
                  item.id,
                  item.creditPartialRepaymentDate,
                  formattedValue
                );
              }}
            />
          </div>

          <Button
            className={styles.deleteButton}
            icon={<IconCross className={styles.cross} />}
            onClick={() => {
              deletePartialRepayment(item.id);
            }}
            type="button"
          />
        </li>
      ))}
    </ul>
  );
};

export default CreditPartialRepaymentList;
