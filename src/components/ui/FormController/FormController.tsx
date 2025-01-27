import { ElementType } from "react";
import { RegisterOptions, useController } from "react-hook-form";

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
  const { field, fieldState } = useController({
    name,
    rules,
    ...props,
  });

  return (
    <Component
      className={className}
      {...field}
      {...fieldState}
      name={name}
      label={label}
      error={fieldState.error?.message}
      {...props}
    />
  );
};

export default FormController;
