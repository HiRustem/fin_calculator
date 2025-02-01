import { useState } from "react";
import Dropdown from "../Dropdown/Dropdown";
import CurrencyDropdownContent from "./CurrencyDropdownContent/CurrencyDropdownContent";

interface ICurrencyDropdown {
  options: string[];
  onSelect: (value: string) => void;
}

const CurrencyDropdown = ({ options, onSelect }: ICurrencyDropdown) => {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [selected, setSelected] = useState<string>(options[0]);

  const onSelectHandler = (value: string) => {
    onSelect(value);
    setSelected(value);
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
        <CurrencyDropdownContent options={options} onSelect={onSelectHandler} />
      }
    />
  );
};

export default CurrencyDropdown;
