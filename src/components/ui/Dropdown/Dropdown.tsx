import * as DropdownMenu from "@radix-ui/react-dropdown-menu";
import { ReactNode } from "react";

import styles from "./Dropdown.module.scss";

interface IDropdown {
  isOpen: boolean;
  setIsOpen: (value: boolean) => void;
  trigger: ReactNode;
  content: ReactNode;
  align?: "center" | "start" | "end";
  side?: "bottom" | "top" | "right" | "left";
  sideOffset?: number;
}

const Dropdown = ({
  isOpen,
  setIsOpen,
  trigger,
  content,
  align,
  side,
  sideOffset,
}: IDropdown) => {
  const onOpenHandler = () => {
    if (isOpen) setIsOpen(false);

    if (!isOpen) setIsOpen(true);
  };

  return (
    <DropdownMenu.Root open={isOpen} onOpenChange={onOpenHandler}>
      <DropdownMenu.Trigger asChild>{trigger}</DropdownMenu.Trigger>

      <DropdownMenu.Portal>
        <DropdownMenu.Content
          translate="no"
          align={align}
          side={side}
          sideOffset={sideOffset}
          className={styles.content}
        >
          {content}
        </DropdownMenu.Content>
      </DropdownMenu.Portal>
    </DropdownMenu.Root>
  );
};

export default Dropdown;
