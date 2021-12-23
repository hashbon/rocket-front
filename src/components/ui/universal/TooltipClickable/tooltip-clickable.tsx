import "./tooltip-clickable.scss";
import React, { FC, ReactChild, ReactFragment, ReactPortal, useCallback, useRef, useState } from "react";
import { ReactComponent as CloseIcon } from "./assets/icons/close.svg";
import { ReactComponent as InfoIcon } from "./assets/icons/info.svg";
// eslint-disable-next-line import/no-named-as-default
import useOnClickOutside from "../../../../hooks/useOnClickOutside";

type ReactNode = ReactChild | ReactFragment | ReactPortal | boolean | null | undefined;
type ClickCallbackSign = (e: React.MouseEvent<HTMLButtonElement>) => void;

export interface TooltipClickableProps {
  children: ReactNode;
}

const TooltipClickableComponent: FC<TooltipClickableProps> = (props) => {
  const { children } = props;
  const selfNode = useRef<HTMLDivElement | null>(null);
  const [isVisible, setIsVisible] = useState(false);

  const handleChangeVisible: ClickCallbackSign = useCallback(() => {
    setIsVisible(!isVisible);
  }, [isVisible]);

  useOnClickOutside(selfNode, () => setIsVisible(false));

  return (
    <div className="TooltipClickable_wrapper" ref={selfNode}>
      {isVisible ? (
        <div className="TooltipClickable_content">
          <button className="TooltipClickable_hide-icon" onClick={handleChangeVisible}>
            <CloseIcon />
          </button>
          <div className="TooltipClickable_content_context">{children}</div>
        </div>
      ) : (
        <button className="TooltipClickable_show-icon" onClick={handleChangeVisible}>
          <InfoIcon />
        </button>
      )}
    </div>
  );
};

export const TooltipClickable = React.memo(TooltipClickableComponent);
