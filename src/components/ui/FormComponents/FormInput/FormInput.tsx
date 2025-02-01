import FormController from "../FormController/FormController";
import Input from "../../Input/Input";
import { IInputProps } from "../../Input/model/types";
import { IFormController } from "../model/types";
import React from "react";

type IFormInput = Omit<IFormController<IInputProps>, "component">;

const FormInput = ({
  name,
  label,
  className,
  onChangeHandler,
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
      props={props}
      maskedOptions={maskedOptions}
      onChangeHandler={onChangeHandler}
    />
  );
};

export default React.memo(FormInput);
