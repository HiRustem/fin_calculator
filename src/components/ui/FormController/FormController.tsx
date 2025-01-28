import { ElementType } from "react";
import { Controller, RegisterOptions, useFormContext } from "react-hook-form";

interface IFormController<T> {
  name: string;
  label?: string;
  component: ElementType;
  rules?: RegisterOptions;
  className?: string;
  props?: T;
}

const FormController = <T,>({
  name,
  label,
  component: Component,
  rules,
  className,
  props,
}: IFormController<T>) => {
  const { control } = useFormContext();

  return (
    <Controller
      name={name}
      rules={rules}
      control={control}
      render={({ field: { onChange, value }, fieldState: { error } }) => (
        <Component
          className={className}
          name={name}
          label={label}
          {...props}
          value={value}
          onChange={onChange}
          error={error}
        />
      )}
    />
  );
};

export default FormController;
