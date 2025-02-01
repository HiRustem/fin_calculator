import { Controller, useFormContext } from "react-hook-form";
import { IFormController } from "../model/types";

const FormController = <T,>({
  name,
  label,
  component: Component,
  rules,
  className,
  onChangeHandler,
  maskedOptions,
  props,
}: IFormController<T>) => {
  const { control } = useFormContext();

  return (
    <Controller
      name={name}
      rules={rules}
      control={control}
      render={({ field, fieldState, formState }) => {
        return (
          <Component
            className={className}
            name={name}
            label={label}
            value={field.value}
            {...props}
            onChange={
              onChangeHandler?.({ field, fieldState, formState }) ??
              field.onChange
            }
            error={fieldState.error?.message}
            {...maskedOptions}
          />
        );
      }}
    />
  );
};

export default FormController;
