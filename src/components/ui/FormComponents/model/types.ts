import { ChangeEventHandler, ElementType } from "react";
import {
  ControllerFieldState,
  ControllerRenderProps,
  FieldValues,
  RegisterOptions,
  UseFormStateReturn,
} from "react-hook-form";
import { MaskedInputProps } from "react-text-mask";

interface IOnChangeHandlerDto<TFieldValues extends FieldValues = FieldValues> {
  field: ControllerRenderProps;
  fieldState: ControllerFieldState;
  formState: UseFormStateReturn<TFieldValues>;
}

export interface IFormController<T> {
  name: string;
  label?: string;
  component: ElementType;
  rules?: RegisterOptions;
  className?: string;
  onChangeHandler?: (dto: IOnChangeHandlerDto) => ChangeEventHandler;
  maskedOptions?: MaskedInputProps;
  props?: T;
}
