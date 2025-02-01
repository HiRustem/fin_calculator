import IconChevronDown from "@/assets/chevron-down.svg?react";

import styles from "./DropdownTrigger.module.scss";
import clsx from "clsx";

interface IDropdownTrigger {
  selected?: string;
  isOpen: boolean;
  className?: string;
}

const DropdownTrigger = ({ selected, isOpen, className }: IDropdownTrigger) => {
  return (
    <button className={clsx(styles.trigger, className)}>
      <p>{selected}</p>

      <div className={styles.chevronWrapper}>
        <IconChevronDown
          className={clsx(styles.chevron, { [styles.opened]: isOpen })}
        />
      </div>
    </button>
  );
};

export default DropdownTrigger;
