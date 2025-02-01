import { ReactNode } from "react";

export interface IDropdown {
  isOpen: boolean;
  setIsOpen: (value: boolean) => void;
  selected?: string;
  trigger?: ReactNode;
  content: ReactNode;
  align?: "center" | "start" | "end";
  side?: "bottom" | "top" | "right" | "left";
  sideOffset?: number;
  triggerClassName?: string;
  fullWidthTrigger?: boolean;
  contentClassName?: string;
}

export interface IDropdownTrigger {
  selected?: string;
  isOpen?: boolean;
  className?: string;
}

export interface IDropdownInputTrigger extends IDropdownTrigger {
  rightIcon?: ReactNode;
  label?: string;
}
