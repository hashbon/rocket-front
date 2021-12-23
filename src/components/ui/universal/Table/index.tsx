import "./index.scss";
import React, { FC } from "react";
import classNames from "classnames";
import { useMobileDetect } from "../../../../hooks/useMobileDetect";

export interface ITableProps {
  data: { [key: string]: string }[];
  children: React.ReactElement[],
  before?: React.ReactNode,
  shadow?: boolean
}

export interface ITableColumnProps {
  label: string,
  prop: string,
  data?: { [key: string]: string }[];
  width?: number,
  content?: (data: string) => React.ReactNode | React.ReactNode[],
  align?: "center" | "left" | "right"
}

export const Main: FC<ITableProps> = (properties) => {
  const { children, data, before, shadow } = properties;

  const { isMobile } = useMobileDetect();

  const random = Math.random() * 1000;

  return (
    <div
      className={classNames("table--main", {
        "table--shadow": !!shadow,
      })}>
      {!!before && <div className="table--before">{before}</div>}

      {!isMobile && <div className="table--title">{children}</div>}

      <div className="table--wrapper">
        {data.map((item: { [key: string]: string }, key: number) => (
          <div className="table--row" key={`${random}table_${key}`}>
            {children.map((child: React.ReactElement, childKey: number) => {
              const { props } = child;
              const { align } = props;
              const width = "width" in props ? props.width : undefined;

              return (
                <div
                  key={`${random}table_${key}_${childKey}`}
                  className={classNames("table--column", {
                    [`table--column_${align}`]: !!align && !isMobile,
                    "table--no_flex": !!width && !isMobile,
                  })}
                  style={width && !isMobile ? { flexBasis: `${width}px` } : {}}>
                  <div className="table--column_content">
                    {isMobile && props.label && <div className="table--column_content_item label">{props.label}</div>}
                    <div className="table--column_content_item">
                      {props.content ? props.content(item) : item[props.prop] || "---"}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        ))}
      </div>
    </div>
  );
};

Main.defaultProps = {
  shadow: true,
};

export const Column: FC<ITableColumnProps> = ({ label, width, align }) => (
  <div
    className={classNames("table--title--item", {
      [`table--title--item_${align}`]: !!align,
      "table--no_flex": !!width,
    })}
    style={width ? { flexBasis: `${width}px` } : {}}>
    <span>{label}</span>
  </div>
);

export const Header: FC<{ title: string; filledbg?: boolean }> = ({ title, filledbg }) => (
  <div
    className={classNames("table--header", {
      filledbg: !!filledbg,
    })}>
    <div className="table--header_title">
      <span>{title}</span>
    </div>
  </div>
);
