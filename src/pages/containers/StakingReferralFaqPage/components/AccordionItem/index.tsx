import "./index.scss";
import React, { ReactNode, useState } from "react";
import { ReactComponent as CloseSVG } from "./close.svg";

interface IAccordionItem {
  title: string;
  description: string | ReactNode;
}

const AccordionItem: React.FC<IAccordionItem> = ({ title, description }) => {
  const [isOpened, setIsOpened] = useState(false);
  return (
    <div className="AccordionItem_wrapper no_select">
      <div className="AccordionItem_wrapper_header">
        <div className="AccordionItem_wrapper_header_left" onClick={() => setIsOpened(!isOpened)}>
          <span>{title}</span>
        </div>
        <div className="AccordionItem_wrapper_header_right">
          <div
            className={`AccordionItem_wrapper_header_right_close${isOpened ? " rotate" : ""}`}
            onClick={() => setIsOpened(!isOpened)}>
            <CloseSVG />
          </div>
        </div>
      </div>
      {isOpened && (
        <div className="AccordionItem_wrapper_content">
          <span>{description}</span>
        </div>
      )}
    </div>
  );
};

export default AccordionItem;
