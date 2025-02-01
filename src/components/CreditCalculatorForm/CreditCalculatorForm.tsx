import { ChangeEvent, FormEvent } from "react";

import { FormProvider, useForm } from "react-hook-form";

import { useShallow } from "zustand/react/shallow";

import {
  createPercentMask,
  creditAmountRules,
  creditCalculatorDefaultValues,
  creditPercentRules,
  percentPipe,
} from "./model/consts";

import {
  CreditRepaymentProcedure,
  CreditStartDropdown,
  FormInput,
} from "../ui";

import styles from "./CreditCalculatorForm.module.scss";
import useCreditCalculatorStore from "@/pages/CreditCalculator/model/store";
import PeriodDropdown from "../ui/PeriodDropdown/PeriodDropdown";
import { CreditPeriodType } from "@/pages/CreditCalculator/model/types";
import CreditRepaymentFrequency from "../ui/CreditRepaymentFrequency/CreditRepaymentFrequency";

const CreditCalculatorForm = () => {
  // const [, setCurrency] = useState<string>("₽");

  const { setValue, creditPeriodType } = useCreditCalculatorStore(
    useShallow((state) => ({
      setValue: state.setValue,
      creditPeriodType: state.creditPeriodType,
    }))
  );

  const methods = useForm({
    mode: "onChange",
    reValidateMode: "onChange",
    defaultValues: creditCalculatorDefaultValues,
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
            onChangeHandler={({ field }) => {
              return (event: ChangeEvent<HTMLInputElement>) => {
                setValue("creditAmount", event.target.value);
                field.onChange(event.target.value);
              };
            }}
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
            onChangeHandler={({ field }) => {
              return (event: ChangeEvent<HTMLInputElement>) => {
                setValue("creditPercent", event.target.value);
                field.onChange(event.target.value);
              };
            }}
          />

          <FormInput
            label="Срок кредита/займа"
            name="creditPeriod"
            className={styles.formField}
            onChangeHandler={({ field }) => {
              return (event: ChangeEvent<HTMLInputElement>) => {
                setValue("creditPeriod", event.target.value);
                field.onChange(event.target.value);
              };
            }}
            props={{
              blockRight: (
                <PeriodDropdown
                  selected={creditPeriodType}
                  onSelect={(value: CreditPeriodType) => {
                    setValue("creditPeriodType", value);
                  }}
                />
              ),
            }}
          />

          <CreditStartDropdown className={styles.formField} />

          <CreditRepaymentProcedure
            className={styles.formField}
            contentClassName={styles.formFieldWidth}
          />

          <CreditRepaymentFrequency
            className={styles.formField}
            contentClassName={styles.formFieldWidth}
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
