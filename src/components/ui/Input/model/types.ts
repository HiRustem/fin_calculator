import { ChangeEvent, InputHTMLAttributes, ReactNode } from "react";

export interface IInputRef {
  inputID: string;
}

export interface IInputProps
  extends Partial<InputHTMLAttributes<HTMLInputElement>> {
  blockRight?: ReactNode;
  error?: string;
  hintText?: string;
  iconLeft?: ReactNode;
  iconRight?: ReactNode;
  label?: string;
  labelTextClassName?: string;
  onChange?: (event: ChangeEvent<HTMLInputElement>) => void;
  rightLabel?: string | JSX.Element;
}