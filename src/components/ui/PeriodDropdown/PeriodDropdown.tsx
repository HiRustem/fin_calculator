import { useState } from "react";
import Dropdown from "../Dropdown/Dropdown";
import PeriodDropdownContent from "./PeriodDropdownContent/PeriodDropdownContent";
import { CreditPeriodType } from "@/pages/CreditCalculator/model/types";

import styles from "./PeriodDropdown.module.scss";

interface IPeriodDropdown {
  selected: CreditPeriodType;
  onSelect: (value: CreditPeriodType) => void;
}

const PeriodDropdown = ({ selected, onSelect }: IPeriodDropdown) => {
  const [isOpen, setIsOpen] = useState<boolean>(false);

  const onSelectHandler = (value: CreditPeriodType) => {
    onSelect(value);
    setIsOpen(false);
  };

  return (
    <Dropdown
      isOpen={isOpen}
      setIsOpen={setIsOpen}
      selected={selected}
      sideOffset={20}
      align="center"
      side="bottom"
      content={
        <PeriodDropdownContent selected={selected} onSelect={onSelectHandler} />
      }
      thiggerClassName={styles.trigger}
    />
  );
};

export default PeriodDropdown;
