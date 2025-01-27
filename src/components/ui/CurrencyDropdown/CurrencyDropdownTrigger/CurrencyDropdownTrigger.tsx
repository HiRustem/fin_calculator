import IconChevronDown from "@/assets/chevron-down.svg?react";

import styles from "./CurrencyDropdownTrigger.module.scss";
import clsx from "clsx";

interface ICurrencyDropdownTrigger {
  selected: string;
  isOpen: boolean;
}

const CurrencyDropdownTrigger = ({
  selected,
  isOpen,
}: ICurrencyDropdownTrigger) => {
  return (
    <div className={styles.trigger}>
      <p className={styles.text}>{selected}</p>

      <div className={styles.chevronWrapper}>
        <IconChevronDown
          className={clsx(styles.chevron, { [styles.opened]: isOpen })}
        />
      </div>
    </div>
  );
};

export default CurrencyDropdownTrigger;
