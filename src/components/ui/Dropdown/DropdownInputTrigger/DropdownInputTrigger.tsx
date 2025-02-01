import clsx from "clsx";
import { IDropdownInputTrigger } from "../model/types";

import IconChevronDown from "@/assets/chevron-down.svg?react";

import styles from "./DropdownInputTrigger.module.scss";

const DropdownInputTrigger = ({
  selected,
  isOpen,
  rightIcon,
  label,
  className,
}: IDropdownInputTrigger) => {
  return (
    <div className={styles.container}>
      <div className={clsx(styles.wrapper, className)}>
        <div className={styles.container}>
          <div className={styles.buttonWrapper}>
            <div className={styles.text}>{selected}</div>

            {rightIcon ?? (
              <IconChevronDown
                className={clsx(styles.chevron, { [styles.opened]: isOpen })}
              />
            )}
          </div>

          <div className={styles.label}>{label}</div>
        </div>
      </div>
    </div>
  );
};

export default DropdownInputTrigger;
