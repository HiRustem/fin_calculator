import { CreditRepaymentFrequency } from "@/pages/CreditCalculator/model/types";
import styles from "./CreditRepaymentFrequencyContent.module.scss";
import { creditFrequencyOptions } from "../../model/consts";
import clsx from "clsx";

interface ICreditRepaymentFrequencyContent {
  selected: CreditRepaymentFrequency;
  onSelect: (value: CreditRepaymentFrequency) => void;
}

const CreditRepaymentFrequencyContent = ({
  selected,
  onSelect,
}: ICreditRepaymentFrequencyContent) => {
  return (
    <ul className={styles.list}>
      {creditFrequencyOptions.map((option) => (
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

export default CreditRepaymentFrequencyContent;
