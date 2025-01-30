import { FormEvent } from "react";

import { FormProvider, useForm } from "react-hook-form";

import {
  createPercentMask,
  creditAmountRules,
  creditPercentRules,
  defaultValues,
  percentPipe,
} from "./model/consts";

import { FormInput } from "../ui";

import styles from "./CreditCalculatorForm.module.scss";

const CreditCalculatorForm = () => {
  // const [, setCurrency] = useState<string>("₽");

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
        <div className={styles.fields}>
          <FormInput
            label="Сумма кредита/займа"
            name="creditAmount"
            rules={creditAmountRules}
            className={styles.formField}
          />

          <FormInput
            label="Процентная ставка, % годовых"
            name="creditPercent"
            rules={creditPercentRules}
            className={styles.formField}
            maskedOptions={{
              mask: createPercentMask,
              pipe: percentPipe,
              guide: true,
            }}
          />
        </div>

        <button disabled={!methods.formState.isValid} type="submit">
          Submit
        </button>
      </form>
    </FormProvider>
  );
};

export default CreditCalculatorForm;
