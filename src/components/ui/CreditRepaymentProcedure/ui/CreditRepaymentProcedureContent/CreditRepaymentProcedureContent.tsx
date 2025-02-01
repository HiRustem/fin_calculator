import clsx from "clsx";
import { creditRepaymentOptions } from "../../model/consts";

import styles from "./CreditRepaymentProcedureContent.module.scss";
import { CreditRepaymentProcedure } from "@/pages/CreditCalculator/model/types";

interface ICreditRepaymentProcedureContent {
  selected: CreditRepaymentProcedure;
  onSelect: (value: CreditRepaymentProcedure) => void;
}

const CreditRepaymentProcedureContent = ({
  selected,
  onSelect,
}: ICreditRepaymentProcedureContent) => {
  return (
    <ul className={styles.list}>
      {creditRepaymentOptions.map((option) => (
        <li
          key={option}
          className={clsx(styles.item, {
            [styles.selected]: option === selected,
          })}
        >
          <button className={styles.button} onClick={() => onSelect(option)}>
            {option}
          </button>
        </li>
      ))}
    </ul>
  );
};

export default CreditRepaymentProcedureContent;
