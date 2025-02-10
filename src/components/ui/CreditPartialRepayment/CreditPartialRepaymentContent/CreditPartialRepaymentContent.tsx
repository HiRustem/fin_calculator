import { CreditPartialType } from "@/pages/CreditCalculator/model/types";
import styles from "./CreditPartialRepaymentContent.module.scss";
import { creditPartialRepaymentOptions } from "../model/consts";
import clsx from "clsx";

interface ICreditPartialRepaymentContent {
  selected: CreditPartialType;
  onSelect: (value: CreditPartialType) => void;
}

const CreditPartialRepaymentContent = ({
  selected,
  onSelect,
}: ICreditPartialRepaymentContent) => {
  return (
    <ul className={styles.list}>
      {creditPartialRepaymentOptions.map((option) => (
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

export default CreditPartialRepaymentContent;
