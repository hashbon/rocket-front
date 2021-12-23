import * as React from "react";
import Card from "../../ui/universal/Card";

interface DarkWrapperProps {
  horizontalPadding?: 1 | 2 | 3 | 4;
  verticalPadding?: 1 | 2 | 3 | 4;
}

export const DarkWrapper: React.FC<DarkWrapperProps> = (props) => {
  const { children, horizontalPadding, verticalPadding } = props;
  return (
    <Card
      background={"dark"}
      horizontalPadding={horizontalPadding || 3}
      verticalPadding={verticalPadding || 3}
      rounded={true}>
      {children}
    </Card>
  );
};
