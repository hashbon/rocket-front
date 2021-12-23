import "./index.scss";
import * as React from "react";
import { WindowTabsChildren, WithTabsProps } from "../../hocs/withTabs";
import { useMobileDetect } from "../../../hooks/useMobileDetect";

type Props = WithTabsProps;

export const WindowTabs: React.FC<Props> = (props) => {
  const children = props.children as WindowTabsChildren[];

  const { isMobile } = useMobileDetect();

  const buttons = children.map((item, i) => {
    const getClassName = (className: string) => {
      switch (props.activeIndex) {
        case -1:
          return className;
        case i:
          // eslint-disable-next-line no-return-assign,no-param-reassign
          return (className += ` ${className}--active`);
        default:
          // eslint-disable-next-line no-return-assign,no-param-reassign
          return (className += ` ${className}--inactive`);
      }
    };

    return (
      <li className={`${getClassName("WindowTabs__buttons-item")}`} key={i}>
        <button
          disabled={item.disabled}
          className={`${getClassName("WindowTabs__button")}`}
          type="button"
          onClick={() => {
            props.setActiveIndex(i === props.activeIndex && isMobile ? -1 : i);
          }}>
          {item.title}
        </button>
      </li>
    );
  });

  return (
    <section className="WindowTabs">
      <header className="WindowTabs__header">
        <ul className="WindowTabs__buttons">{buttons}</ul>
      </header>

      <section
        className={`WindowTabs__content ${props.activeIndex < 0 ? "WindowTabs__content--hidden" : ""} ${
          props.activeIndex !== 0 ? "WindowTabs__content--first" : ""
        }`}>
        {children.find((item: WindowTabsChildren, i: number) => i === props.activeIndex)?.el}
      </section>
    </section>
  );
};
