import CreditPartialRepaymentHeader from "./CreditPartialRepaymentHeader/CreditPartialRepaymentHeader";

import styles from "./CreditPartialRepayment.module.scss";
import useCreditCalculatorStore from "@/pages/CreditCalculator/model/store";
import clsx from "clsx";
import CreditPartialRepaymentList from "./CreditPartialRepaymentList/CreditPartialRepaymentList";
import Button from "../Button/Button";
import IconPlus from "@/assets/plus.svg?react";
import { useShallow } from "zustand/react/shallow";

interface IICreditPartialRepayment {
  className?: string;
}

const CreditPartialRepayment = ({ className }: IICreditPartialRepayment) => {
  const { creditPartialRepayment, addPartialRepayment } =
    useCreditCalculatorStore(
      useShallow((state) => ({
        creditPartialRepayment: state.creditPartialRepayment,
        addPartialRepayment: state.addPartialRepayment,
      }))
    );

  return (
    <div className={clsx(styles.container, className)}>
      <CreditPartialRepaymentHeader />

      {!!creditPartialRepayment.creditPartialRepaymentArray.length && (
        <div className={styles.repaymentsContainer}>
          <p className={styles.repaymentsHeading}>Частичное погашение</p>

          <CreditPartialRepaymentList />

          <Button
            type="button"
            text="Добавить еще"
            icon={<IconPlus className={styles.icon} />}
            onClick={() => {
              addPartialRepayment();
            }}
            className={styles.addButton}
          />
        </div>
      )}
    </div>
  );
};

export default CreditPartialRepayment;
