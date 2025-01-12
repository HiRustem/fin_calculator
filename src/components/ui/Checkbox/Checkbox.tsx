import type { ReactNode } from "react";
import React, { useId } from "react";
import styles from "./Checkbox.module.scss";
import clsx from "clsx";

import IconCheckmark from "@/assets/checkmark.svg?react";

export interface ICheckboxProps
  extends React.InputHTMLAttributes<HTMLInputElement> {
  className?: string;
  fullWidth?: boolean;
  label?: string | ReactNode;
  labelClassName?: string;
  labelPosition?: "left" | "right";
  rounded?: boolean;
}

const Checkbox = React.forwardRef(
  (
    {
      label,
      labelPosition,
      fullWidth,
      className,
      rounded = false,
      labelClassName,
      ...props
    }: ICheckboxProps,
    ref: React.ForwardedRef<HTMLInputElement>
  ) => {
    const id = useId();

    return (
      <div
        className={clsx(
          styles.custom_checkbox_wrapper,
          { [styles.fullWidth]: fullWidth },
          className
        )}
      >
        <input
          ref={ref}
          readOnly
          id={id}
          type="checkbox"
          role="checkbox"
          className={clsx(styles.custom_checkbox, {
            [styles.leftLabel]: labelPosition === "left",
            [styles.fullWidth]: fullWidth,
          })}
          {...props}
        />
        <label
          className={clsx(labelClassName, { [styles.rounded]: rounded })}
          htmlFor={id}
        >
          <div className={styles.square}>
            <div className={styles.icon}>
              <IconCheckmark />
            </div>
          </div>
          {label}
        </label>
      </div>
    );
  }
);

export default Checkbox;
