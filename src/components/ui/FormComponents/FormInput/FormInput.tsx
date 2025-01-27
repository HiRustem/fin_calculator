import { RegisterOptions } from "react-hook-form";
import FormController from "../../FormController/FormController";
import Input from "../../Input/Input";
import { IInputProps } from "../../Input/model/types";

interface IFormInput {
  name: string;
  label?: string;
  className?: string;
  rules?: RegisterOptions;
  props: IInputProps;
}

const FormInput = ({ name, label, className, rules, props }: IFormInput) => {
  return (
    <FormController<IInputProps>
      className={className}
      name={name}
      component={Input}
      rules={rules}
      label={label}
      props={props}
    />
  );
};

export default FormInput;
