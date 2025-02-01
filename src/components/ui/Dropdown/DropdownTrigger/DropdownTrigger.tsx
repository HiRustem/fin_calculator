import IconChevronDown from "@/assets/chevron-down.svg?react";

import styles from "./DropdownTrigger.module.scss";
import clsx from "clsx";
import { IDropdownTrigger } from "../model/types";

const DropdownTrigger = ({ selected, isOpen, className }: IDropdownTrigger) => {
  return (
    <div className={clsx(styles.trigger, className)}>
      <p>{selected}</p>

      <div className={styles.chevronWrapper}>
        <IconChevronDown
          className={clsx(styles.chevron, { [styles.opened]: isOpen })}
        />
      </div>
    </div>
  );
};

export default DropdownTrigger;
