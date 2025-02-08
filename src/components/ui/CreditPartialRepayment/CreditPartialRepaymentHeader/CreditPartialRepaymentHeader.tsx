import useCreditCalculatorStore from "@/pages/CreditCalculator/model/store";
import styles from "./CreditPartialRepaymentHeader.module.scss";
import { useShallow } from "zustand/react/shallow";
import Button from "../../Button/Button";

import IconPlus from "@/assets/plus.svg?react";

const CreditPartialRepaymentHeader = () => {
  const { creditPartialRepayment, addPartialRepayment } =
    useCreditCalculatorStore(
      useShallow((state) => ({
        creditPartialRepayment: state.creditPartialRepayment,
        addPartialRepayment: state.addPartialRepayment,
      }))
    );

  return (
    <div className={styles.container}>
      {!creditPartialRepayment.creditPartialRepaymentArray.length && (
        <Button
          type="button"
          text="Добавить частичное погашение"
          icon={<IconPlus className={styles.icon} />}
          onClick={() => {
            addPartialRepayment();
          }}
          className={styles.addButton}
        />
      )}
    </div>
  );
};

export default CreditPartialRepaymentHeader;
