import { forwardRef, useId, useImperativeHandle, useRef } from "react";

import { IInputProps, IInputRef } from "./model/types";
import styles from "./Input.module.scss";
import MaskedInput, { MaskedInputProps } from "react-text-mask";

import clsx from "clsx";

const Input = forwardRef<IInputRef, IInputProps & MaskedInputProps>(
  (
    {
      className,
      onChange,
      label,
      error,
      disabled,
      tabIndex,
      blockRight,
      labelTextClassName,
      onBlur,
      onFocus,
      mask,
      pipe,
      guide,
      ...inputProps
    },
    ref
  ) => {
    const inputID = useId();
    const inputRef = useRef<HTMLInputElement>(null);

    useImperativeHandle(
      ref,
      () => ({
        blur: () => inputRef.current?.blur(),
        focus: () => inputRef.current?.focus(),
        inputID,
      }),
      [inputID]
    );

    return (
      <div
        className={clsx(
          styles.container,
          { [styles.disabled]: disabled },
          className
        )}
      >
        <div className={styles.wrapper}>
          <div
            className={clsx(styles.inputWrapper, {
              [styles.blockRight]: blockRight,
            })}
          >
            {mask ? (
              <MaskedInput
                mask={mask}
                pipe={pipe}
                guide={guide}
                id={inputID}
                onChange={onChange}
                onBlur={onBlur}
                onFocus={onFocus}
                className={styles.input}
                {...inputProps}
              />
            ) : (
              <input
                ref={inputRef}
                id={inputID}
                onChange={onChange}
                onBlur={onBlur}
                onFocus={onFocus}
                className={styles.input}
                {...inputProps}
              />
            )}

            {label && (
              <label
                className={clsx(styles.labelText, labelTextClassName)}
                htmlFor={inputID}
                tabIndex={tabIndex}
              >
                {label}
              </label>
            )}
          </div>

          {blockRight && blockRight}
        </div>
        {error && <span className={styles.error}>{error}</span>}
      </div>
    );
  }
);

export default Input;
