import { RegisterOptions } from "react-hook-form";
import FormController from "../../FormController/FormController";
import Input from "../../Input/Input";
import { IInputProps } from "../../Input/model/types";
import { MaskedInputProps } from "react-text-mask";

interface IFormInput {
  name: string;
  label?: string;
  className?: string;
  rules?: RegisterOptions;
  onInputChange?: (value: string) => string | undefined;
  maskedOptions?: MaskedInputProps;
  props?: IInputProps;
}

const FormInput = ({
  name,
  label,
  className,
  onInputChange,
  maskedOptions,
  rules,
  props,
}: IFormInput) => {
  return (
    <FormController<IInputProps>
      className={className}
      name={name}
      component={Input}
      rules={rules}
      label={label}
      onInputChange={onInputChange}
      props={props}
      maskedOptions={maskedOptions}
    />
  );
};

export default FormInput;
