import useCreditCalculatorStore from "@/pages/CreditCalculator/model/store";
import Dropdown from "../Dropdown/Dropdown";

import { CreditRepaymentFrequency as CreditRepaymentFrequencyType } from "@/pages/CreditCalculator/model/types";
import { useShallow } from "zustand/react/shallow";
import { useState } from "react";
import DropdownInputTrigger from "../Dropdown/DropdownInputTrigger/DropdownInputTrigger";
import CreditRepaymentFrequencyContent from "./ui/CreditRepaymentFrequencyContent/CreditRepaymentFrequencyContent";

interface ICreditRepaymentFrequency {
  className?: string;
  contentClassName?: string;
}

const CreditRepaymentFrequency = ({
  className,
  contentClassName,
}: ICreditRepaymentFrequency) => {
  const { creditRepaymentFrequency, setValue } = useCreditCalculatorStore(
    useShallow((state) => ({
      creditRepaymentFrequency: state.creditRepaymentFrequency,
      setValue: state.setValue,
    }))
  );

  const [isOpen, setIsOpen] = useState<boolean>(false);

  const onSelectHandler = (option: CreditRepaymentFrequencyType) => {
    setValue("creditRepaymentFrequency", option);
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
            selected={creditRepaymentFrequency}
            label="Периодичность погашения"
          />
        }
        fullWidthTrigger={true}
        contentClassName={contentClassName}
        content={
          <CreditRepaymentFrequencyContent
            selected={creditRepaymentFrequency}
            onSelect={onSelectHandler}
          />
        }
      />
    </div>
  );
};

export default CreditRepaymentFrequency;
