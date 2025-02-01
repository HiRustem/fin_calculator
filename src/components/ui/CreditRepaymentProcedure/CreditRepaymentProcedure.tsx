import useCreditCalculatorStore from "@/pages/CreditCalculator/model/store";
import { useShallow } from "zustand/react/shallow";
import Dropdown from "../Dropdown/Dropdown";
import CreditRepaymentProcedureContent from "./ui/CreditRepaymentProcedureContent/CreditRepaymentProcedureContent";
import DropdownInputTrigger from "../Dropdown/DropdownInputTrigger/DropdownInputTrigger";
import { useState } from "react";

import { CreditRepaymentProcedure as CreditRepaymentProcedureType } from "@/pages/CreditCalculator/model/types";

interface ICreditRepaymentProcedure {
  className?: string;
  contentClassName?: string;
}

const CreditRepaymentProcedure = ({
  className,
  contentClassName,
}: ICreditRepaymentProcedure) => {
  const { creditRepaymentProcedure, setValue } = useCreditCalculatorStore(
    useShallow((state) => ({
      creditRepaymentProcedure: state.creditRepaymentProcedure,
      setValue: state.setValue,
    }))
  );

  const [isOpen, setIsOpen] = useState<boolean>(false);

  const onSelectHandler = (option: CreditRepaymentProcedureType) => {
    setValue("creditRepaymentProcedure", option);
    setIsOpen(false);
  };

  return (
    <div className={className}>
      <Dropdown
        isOpen={isOpen}
        setIsOpen={setIsOpen}
        trigger={
          <DropdownInputTrigger
            isOpen={isOpen}
            selected={creditRepaymentProcedure}
            label="Порядок погашения"
          />
        }
        fullWidthTrigger={true}
        contentClassName={contentClassName}
        content={
          <CreditRepaymentProcedureContent
            selected={creditRepaymentProcedure}
            onSelect={onSelectHandler}
          />
        }
      />
    </div>
  );
};

export default CreditRepaymentProcedure;
