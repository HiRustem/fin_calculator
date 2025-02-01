import * as DropdownMenu from "@radix-ui/react-dropdown-menu";
import React, { ReactNode } from "react";
import DropdownTrigger from "./DropdownTrigger/DropdownTrigger";
import { AnimatePresence, motion } from "framer-motion";

import styles from "./Dropdown.module.scss";

interface IDropdown {
  isOpen: boolean;
  setIsOpen: (value: boolean) => void;
  selected?: string;
  trigger?: ReactNode;
  content: ReactNode;
  align?: "center" | "start" | "end";
  side?: "bottom" | "top" | "right" | "left";
  sideOffset?: number;
  thiggerClassName?: string;
}

const Dropdown = ({
  isOpen,
  setIsOpen,
  trigger,
  content,
  selected,
  align,
  side,
  sideOffset,
  thiggerClassName,
}: IDropdown) => {
  const onOpenHandler = () => {
    if (isOpen) setIsOpen(false);

    if (!isOpen) setIsOpen(true);
  };

  return (
    <DropdownMenu.Root open={isOpen} onOpenChange={onOpenHandler}>
      <DropdownMenu.Trigger className={styles.trigger}>
        {trigger ? (
          trigger
        ) : (
          <DropdownTrigger
            selected={selected}
            isOpen={isOpen}
            className={thiggerClassName}
          />
        )}
      </DropdownMenu.Trigger>

      <DropdownMenu.Portal>
        <AnimatePresence>
          {isOpen && (
            <motion.div
              initial="closed"
              animate="open"
              exit="closed"
              transition={{
                duration: 0.3,
              }}
              variants={{
                open: {
                  opacity: 1,
                },
                closed: {
                  opacity: 0,
                },
              }}
            >
              <DropdownMenu.Content
                align={align}
                side={side}
                sideOffset={sideOffset}
                className={styles.content}
              >
                {content}
              </DropdownMenu.Content>
            </motion.div>
          )}
        </AnimatePresence>
      </DropdownMenu.Portal>
    </DropdownMenu.Root>
  );
};

export default React.memo(Dropdown);
