import { FormEvent, useState } from "react";

import { FormProvider, useForm } from "react-hook-form";

import {
  creditAmountOptions,
  creditAmountRules,
  defaultValues,
} from "./model/consts";

import styles from "./CreditCalculatorForm.module.scss";
import { CurrencyDropdown, FormInput } from "../ui";

const CreditCalculatorForm = () => {
  const [, setCurrency] = useState<string>("₽");

  const methods = useForm({
    mode: "onChange",
    reValidateMode: "onChange",
    defaultValues,
  });

  const onSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    console.log(methods.getValues());

    methods.handleSubmit(() => {});
  };

  return (
    <FormProvider {...methods}>
      <form onSubmit={onSubmit} className={styles.form}>
        <FormInput
          label="Сумма кредита/займа"
          name="creditAmount"
          rules={creditAmountRules}
          className={styles.formItem}
          props={{
            blockRight: (
              <CurrencyDropdown
                options={creditAmountOptions}
                onSelect={(value: string) => setCurrency(value)}
              />
            ),
          }}
        />

        <button disabled={!methods.formState.isValid} type="submit">
          Submit
        </button>
      </form>
    </FormProvider>
  );
};

export default CreditCalculatorForm;
