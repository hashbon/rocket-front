import "./index.scss";
import * as React from "react";
import Card from "../../ui/universal/Card";
import Heading from "../../ui/universal/Heading";
import Spacer from "../../ui/universal/Spacer";
import { TooltipClickable } from "../../ui/universal/TooltipClickable";

export interface AccentWindowWrapperProps {
  title: string;
  tooltip?: React.ReactNode;
}

export const AccentWindowWrapper: React.FC<AccentWindowWrapperProps> = (props) => {
  const { title, children, tooltip = undefined } = props;
  return (
    <Card background={"accent"} horizontalPadding={4} verticalPadding={4}>
      {!!tooltip && (
        <div className="AccentWindowWrapper_tooltip-helper">
          <TooltipClickable>{tooltip}</TooltipClickable>
        </div>
      )}
      <Heading size={1} bold underline={false}>
        {title}
      </Heading>
      <Spacer size={8} />
      {children}
    </Card>
  );
};
