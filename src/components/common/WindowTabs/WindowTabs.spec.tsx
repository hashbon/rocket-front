import * as React from "react";
import { render, fireEvent } from "@testing-library/react";
import { WindowTabs } from "./index";

const mobileDetectObj = { isMobile: false };
const useMobileDetect = jest.fn(() => mobileDetectObj);

jest.mock("../../../hooks/useMobileDetect", () => ({ useMobileDetect }));

const Component: jest.MockedFunction<typeof WindowTabs> = jest.fn(WindowTabs);

describe("WindowTabs", () => {
  let container: HTMLElement;
  const props = {
    activeIndex: 0,
    setActiveIndex: jest.fn(),
    children: [
      {
        title: "first tab title",
        disabled: false,
        el: "first tab content",
      },
      {
        title: "second tab title",
        disabled: false,
        el: "second tab content",
      },
      {
        title: "third tab title",
        disabled: false,
        el: "third tab content",
      },
    ],
  };

  beforeEach(() => {
    container = render(<Component {...props} />).container;
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it("should render", () => {
    expect(Component).toHaveBeenNthCalledWith(1, props, {});
  });

  it("useMobileDetect", () => {
    expect(useMobileDetect).toHaveBeenNthCalledWith(1);
  });

  it("elements quantity", () => {
    const buttons = container.querySelectorAll(".WindowTabs__buttons-item");
    expect(buttons.length).toEqual(props.children.length);
  });

  it("if active index equals 1 className should be render correctly", () => {
    props.activeIndex = 1;
    const el = render(<Component {...props} />).container.querySelector(".WindowTabs__content--first");
    expect(el).toBeTruthy();
  });

  it("if active index equals -1 className should be render correctly", () => {
    props.activeIndex = -1;
    const el = render(<Component {...props} />).container.querySelector(".WindowTabs__content--hidden");
    expect(el).toBeTruthy();
  });

  it("selected tab should be render correctly", () => {
    props.activeIndex = 2;
    const el = render(<Component {...props} />).getByText(props.children[props.activeIndex].el);
    expect(el).toBeTruthy();
  });

  it("if tab is inactive then component should have special className", () => {
    props.activeIndex = 2;
    const val = render(<Component {...props} />)
      .container.querySelectorAll(".WindowTabs__buttons-item")[1]
      .classList.contains("WindowTabs__buttons-item--inactive");
    expect(val).toEqual(true);
  });

  it("if tab is active then component should have special className", () => {
    props.activeIndex = 2;
    const val = render(<Component {...props} />)
      .container.querySelectorAll(".WindowTabs__buttons-item")[2]
      .classList.contains("WindowTabs__buttons-item--active");
    expect(val).toEqual(true);
  });

  it("if tab is disabled then component should have special className", () => {
    props.children[1].disabled = true;
    const val = (
      render(<Component {...props} />).container.querySelectorAll(".WindowTabs__button")[1] as HTMLButtonElement
    ).disabled;
    expect(val).toEqual(true);
  });

  it("click on tab should set index correctly", () => {
    props.activeIndex = 0;
    const el = render(<Component {...props} />).container.querySelectorAll(".WindowTabs__button")[2];
    fireEvent.click(el);
    expect(props.setActiveIndex).toHaveBeenNthCalledWith(1, 2);
  });

  it("if is mobile and the tab is active then should set active index correctly", () => {
    props.activeIndex = 2;
    mobileDetectObj.isMobile = true;
    jest.clearAllMocks();
    const el = render(<Component {...props} />).container.querySelectorAll(".WindowTabs__button")[2];
    fireEvent.click(el);
    expect(props.setActiveIndex).toHaveBeenNthCalledWith(1, -1);
  });
});
