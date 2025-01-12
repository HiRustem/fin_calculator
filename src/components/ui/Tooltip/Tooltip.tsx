import * as RadixTooltip from "@radix-ui/react-tooltip";
import { ReactNode } from "react";

interface ITooltip {
  trigger: ReactNode;
  content: string | ReactNode;
}

const Tooltip = ({ trigger, content }: ITooltip) => {
  return (
    <RadixTooltip.Provider>
      <RadixTooltip.Root>
        <RadixTooltip.Trigger asChild>{trigger}</RadixTooltip.Trigger>
        <RadixTooltip.Portal>
          <RadixTooltip.Content className="TooltipContent" sideOffset={5}>
            {content}
          </RadixTooltip.Content>
        </RadixTooltip.Portal>
      </RadixTooltip.Root>
    </RadixTooltip.Provider>
  );
};

export default Tooltip;
