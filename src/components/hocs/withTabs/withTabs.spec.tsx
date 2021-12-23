import * as React from "react";
import { render } from "@testing-library/react";
import { withTabs, WindowTabsChildren, WithTabsProps } from "./index";

jest.mock("react", () => ({
  ...jest.requireActual("react"),
  useState: jest.fn(),
}));

interface Props extends WithTabsProps {
  children: WindowTabsChildren | WindowTabsChildren[];
}

describe("withTabs", () => {
  let mockComponent: React.FC<Props>;
  let setActiveIndex: () => void;
  let Component: React.FC<Omit<Props, "activeIndex" | "setActiveIndex">>;

  beforeEach(() => {
    setActiveIndex = () => {};
    const useState = (activeIndex: boolean) => [activeIndex, setActiveIndex];
    (React.useState as unknown as jest.MockedFunction<typeof useState>).mockImplementation(useState);
    mockComponent = jest.fn((props: Props) => <p></p>);
    Component = jest.fn(withTabs(mockComponent));
    render(<Component>{[]}</Component>);
  });

  it("should return component", () => {
    expect(Component).toHaveBeenCalledTimes(1);
  });

  it("should return component with correct props", () => {
    expect(mockComponent).toHaveBeenCalledWith(
      {
        setActiveIndex,
        activeIndex: 0,
        children: [],
      },
      {},
    );
  });
});
