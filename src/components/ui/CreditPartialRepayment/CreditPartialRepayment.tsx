import CreditPartialRepaymentHeader from "./CreditPartialRepaymentHeader/CreditPartialRepaymentHeader";

import styles from "./CreditPartialRepayment.module.scss";
import useCreditCalculatorStore from "@/pages/CreditCalculator/model/store";
import CreditPartialRepaymentList from "./CreditPartialRepaymentList/CreditPartialRepaymentList";
import Button from "../Button/Button";
import IconPlus from "@/assets/plus.svg?react";
import { useShallow } from "zustand/react/shallow";
import Dropdown from "../Dropdown/Dropdown";
import { useState } from "react";
import DropdownInputTrigger from "../Dropdown/DropdownInputTrigger/DropdownInputTrigger";
import CreditPartialRepaymentContent from "./CreditPartialRepaymentContent/CreditPartialRepaymentContent";
import { CreditPartialType } from "@/pages/CreditCalculator/model/types";

interface IICreditPartialRepayment {
  className?: string;
  contentClassName?: string;
}

const CreditPartialRepayment = ({
  contentClassName,
}: IICreditPartialRepayment) => {
  const {
    creditPartialRepayment,
    addPartialRepayment,
    setCreditPartialRepaymentType,
  } = useCreditCalculatorStore(
    useShallow((state) => ({
      creditPartialRepayment: state.creditPartialRepayment,
      addPartialRepayment: state.addPartialRepayment,
      setCreditPartialRepaymentType: state.setCreditPartialRepaymentType,
    }))
  );

  const [isOpen, setIsOpen] = useState<boolean>(false);

  const onSelectHandler = (option: CreditPartialType) => {
    setCreditPartialRepaymentType(option);
    setIsOpen(false);
  };

  return (
    <div className={styles.container}>
      <CreditPartialRepaymentHeader />

      {!!creditPartialRepayment.creditPartialRepaymentArray.length && (
        <div className={styles.repaymentsContainer}>
          <div className={styles.repaymentsHeadingContainer}>
            <p className={styles.repaymentsHeading}>Частичное погашение</p>

            <div className={styles.repaymentsTypeWrapper}>
              <Dropdown
                isOpen={isOpen}
                setIsOpen={setIsOpen}
                trigger={
                  <DropdownInputTrigger
                    isOpen={isOpen}
                    selected={creditPartialRepayment.creditPartialType}
                    label="Порядок частичного погашения"
                    textClassName={styles.repaymentsTypeDropdownText}
                  />
                }
                fullWidthTrigger={true}
                contentClassName={contentClassName}
                content={
                  <CreditPartialRepaymentContent
                    selected={creditPartialRepayment.creditPartialType}
                    onSelect={onSelectHandler}
                  />
                }
              />
            </div>
          </div>

          <CreditPartialRepaymentList />

          <Button
            type="button"
            text="Добавить еще"
            icon={<IconPlus className={styles.icon} />}
            onClick={() => {
              addPartialRepayment();
            }}
            className={styles.addButton}
          />
        </div>
      )}
    </div>
  );
};

export default CreditPartialRepayment;
