import * as React from "react";
import { render } from "@testing-library/react";
import { withActive } from "./index";

jest.mock("react", () => ({
  ...jest.requireActual("react"),
  useState: jest.fn(),
}));

interface Props {
  testData: string;
}

describe("withActive", () => {
  let mockComponent: React.FC<Props>;
  let setActive: () => void;
  let Component: React.FC<Props>;

  beforeEach(() => {
    setActive = () => {};
    const useState = (isActive: boolean) => [isActive, setActive];
    (React.useState as unknown as jest.MockedFunction<typeof useState>).mockImplementation(useState);
    mockComponent = jest.fn((props: Props) => null);
    Component = jest.fn(withActive(mockComponent));
    render(<Component testData={"text"} />);
  });

  it("should return component", () => {
    expect(Component).toHaveBeenCalledTimes(1);
  });

  it("should return component with correct props", () => {
    expect(mockComponent).toHaveBeenCalledWith(
      {
        setActive,
        isActive: false,
        testData: "text",
      },
      {},
    );
  });
});
