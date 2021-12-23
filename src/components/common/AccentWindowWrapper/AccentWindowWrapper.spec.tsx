import * as React from "react";
import { render } from "@testing-library/react";
import { IPropsComponent as CardProps } from "../../ui/universal/Card/assets/interfaces";
import { IPropsComponent as HeadingProps } from "../../ui/universal/Heading/assets/interfaces";
import { AccentWindowWrapper, AccentWindowWrapperProps } from "./index";


const Card = jest.fn((props: CardProps ) => (<>{props.children}</>));
const Heading = jest.fn((props: HeadingProps) => null);
const Spacer = jest.fn(() => null);
const TooltipClickable = jest.fn(() => null);

jest.mock("../../ui/universal/Card", () => Card);
jest.mock("../../ui/universal/Heading", () => Heading);
jest.mock("../../ui/universal/Spacer", () => Spacer);
jest.mock("../../ui/universal/TooltipClickable", () => ({ TooltipClickable }));

describe("AccentWindowWrapper", () => {
  const Component: jest.MockedFunction<typeof AccentWindowWrapper> = jest.fn(AccentWindowWrapper);
  const props: AccentWindowWrapperProps = {
    title: "title",
    tooltip: (<p>tooltip</p>),
  };

  beforeEach(() => {
    render(<Component {...props} />);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it("should render", () => {
    expect(Component).toHaveBeenNthCalledWith(1, props, {});
  });

  it("should pass properties correctly", () => {
    expect(Card.mock.calls[0][0]).toMatchObject({
      background: "accent",
      horizontalPadding: 4,
      verticalPadding: 4,
    });
    expect(Heading.mock.calls[0][0]).toMatchObject({
      size: 1,
      bold: true,
      underline: false,
    });
  });

  it("if tooltip is defined then should render component", () => {
    props.tooltip = "<p></p>";
    jest.clearAllMocks();
    render(<Component {...props} />);
    expect(TooltipClickable).toHaveBeenCalledTimes(1);
  });

  it("if tooltip is not defined then should not render component", () => {
    props.tooltip = undefined;
    jest.clearAllMocks();
    render(<Component {...props} />);
    expect(TooltipClickable).toHaveBeenCalledTimes(0);
  });
});
