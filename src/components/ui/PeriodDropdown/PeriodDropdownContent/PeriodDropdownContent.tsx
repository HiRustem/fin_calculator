import { CreditPeriodType } from "@/pages/CreditCalculator/model/types";
import { periodDropdownOptions } from "../model/consts";
import styles from "./PeriodDropdownContent.module.scss";
import clsx from "clsx";

interface IPeriodDropdownContent {
  selected: CreditPeriodType;
  onSelect: (value: CreditPeriodType) => void;
}

const PeriodDropdownContent = ({
  selected,
  onSelect,
}: IPeriodDropdownContent) => {
  return (
    <ul className={styles.list}>
      {periodDropdownOptions.map((option) => (
        <li
          key={option}
          className={clsx(styles.item, {
            [styles.selected]: option === selected,
          })}
        >
          <button
            className={styles.button}
            onClick={() => {
              onSelect(option);
            }}
          >
            {option}
          </button>
        </li>
      ))}
    </ul>
  );
};

export default PeriodDropdownContent;
