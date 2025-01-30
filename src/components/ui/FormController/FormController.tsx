import { useMask } from "@react-input/mask";

import { ChangeEvent, ElementType } from "react";
import { Controller, RegisterOptions, useFormContext } from "react-hook-form";
import { MaskedInputProps } from "react-text-mask";

interface IFormController<T> {
  name: string;
  label?: string;
  component: ElementType;
  rules?: RegisterOptions;
  className?: string;
  onInputChange?: (value: string) => string | undefined;
  maskedOptions?: MaskedInputProps;
  props?: T;
}

const FormController = <T,>({
  name,
  label,
  component: Component,
  rules,
  className,
  onInputChange,
  maskedOptions,
  props,
}: IFormController<T>) => {
  const { control } = useFormContext();

  const inputRef = useMask({
    mask: "99.99",
  });

  return (
    <Controller
      name={name}
      rules={rules}
      control={control}
      render={({ field: { onChange, value }, fieldState: { error } }) => {
        const onChangeHandler = (event: ChangeEvent<HTMLInputElement>) => {
          const value = event.target.value;

          const formattedValue = onInputChange?.(value);

          onChange(formattedValue ?? value);
        };

        return (
          <Component
            ref={inputRef}
            className={className}
            name={name}
            label={label}
            {...props}
            value={value}
            onChange={onChangeHandler}
            error={error?.message}
            {...maskedOptions}
          />
        );
      }}
    />
  );
};

export default FormController;
