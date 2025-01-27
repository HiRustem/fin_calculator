import { RegisterOptions } from "react-hook-form";

export const defaultValues = {
  creditAmount: "100000",
};

export const creditAmountRules: RegisterOptions = {
  required: {
    value: true,
    message: "Это обязательное поле",
  },
  pattern: {
    value: /^[0-9]{1,}$/,
    message: "Невалидное значение",
  },
};

export const creditAmountOptions = ["₽", "$", "€"];
