import Checkbox, { ICheckboxProps } from "../../Checkbox/Checkbox";
import FormController from "../FormController/FormController";
import { IFormController } from "../model/types";

type IFormCheckbox = Omit<IFormController<ICheckboxProps>, "component">;

const FormCheckbox = ({
  name,
  label,
  className,
  onChangeHandler,
  rules,
  props,
}: IFormCheckbox) => {
  return (
    <FormController<ICheckboxProps>
      className={className}
      name={name}
      component={Checkbox}
      rules={rules}
      label={label}
      props={props}
      onChangeHandler={onChangeHandler}
    />
  );
};

export default FormCheckbox;
