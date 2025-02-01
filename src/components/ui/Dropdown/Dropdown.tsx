import * as DropdownMenu from "@radix-ui/react-dropdown-menu";
import React from "react";
import DropdownTrigger from "./DropdownTrigger/DropdownTrigger";
import { AnimatePresence, motion } from "framer-motion";

import styles from "./Dropdown.module.scss";
import { IDropdown } from "./model/types";

import clsx from "clsx";

const Dropdown = ({
  isOpen,
  setIsOpen,
  trigger,
  content,
  selected,
  align,
  side,
  sideOffset,
  triggerClassName,
  fullWidthTrigger,
  contentClassName,
}: IDropdown) => {
  const onOpenHandler = () => {
    if (isOpen) setIsOpen(false);

    if (!isOpen) setIsOpen(true);
  };

  return (
    <DropdownMenu.Root open={isOpen} onOpenChange={onOpenHandler}>
      <DropdownMenu.Trigger
        className={clsx(styles.trigger, {
          [styles.fullWidthTrigger]: fullWidthTrigger,
        })}
      >
        {trigger ? (
          trigger
        ) : (
          <DropdownTrigger
            selected={selected}
            isOpen={isOpen}
            className={triggerClassName}
          />
        )}
      </DropdownMenu.Trigger>

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
            <DropdownMenu.Portal>
              <DropdownMenu.Content
                align={align}
                side={side}
                sideOffset={sideOffset}
                className={clsx(styles.content, contentClassName)}
              >
                {content}
              </DropdownMenu.Content>
            </DropdownMenu.Portal>
          </motion.div>
        )}
      </AnimatePresence>
    </DropdownMenu.Root>
  );
};

export default React.memo(Dropdown);
