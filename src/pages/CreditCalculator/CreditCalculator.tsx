import { DatePicker, Dropdown, Toggle, Tooltip } from "@/components";
import Checkbox from "@/components/ui/Checkbox/Checkbox";
import Input from "@/components/ui/Input/Input";
import { useState } from "react";

const CreditCalculator = () => {
  const [activeTab, setActiveTab] = useState("first");
  const [selected, setSelected] = useState("Вариант 1");
  const [isOpen, setIsOpen] = useState(false);
  const [datePickerValue, setDatePickerValue] = useState<Date>(new Date());

  const onSelect = (variant: string) => {
    setSelected(variant);
    setIsOpen(false);
  };

  return (
    <div>
      <Toggle
        states={["first", "second"]}
        activeTab={activeTab}
        onClick={() => setActiveTab(activeTab === "first" ? "second" : "first")}
      />
      <DatePicker
        value={datePickerValue}
        onChange={(newDate) => setDatePickerValue(newDate)}
      />

      <Input
        label="Ввод значения"
        blockRight={
          <Dropdown
            isOpen={isOpen}
            setIsOpen={setIsOpen}
            trigger={<button>Выбранный вариант: {selected}</button>}
            content={
              <ul>
                <li>
                  <button onClick={() => onSelect("Вариант 1")}>
                    Вариант 1
                  </button>
                  <button onClick={() => onSelect("Вариант 2")}>
                    Вариант 2
                  </button>
                </li>
                <button onClick={() => onSelect("Вариант 3")}>Вариант 3</button>
              </ul>
            }
          />
        }
      />

      <Tooltip
        trigger={<button className="IconButton">+</button>}
        content={"Add to library"}
      />

      <Checkbox label={"asdasdds"} />
    </div>
  );
};

export default CreditCalculator;
