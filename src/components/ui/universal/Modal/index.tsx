import "./index.scss";
import React, { useContext, useEffect, useRef } from "react";
import classNames from "classnames";
import { IPropsComponent } from "./assets/interfaces";
import { ParamsContext } from "../../../../services";
import { isMobile } from "../../../../utils";

const Modal: React.FC<IPropsComponent> = (props) => {
  const selfNode = useRef<HTMLDivElement>(null);
  const {
    opened, width, close, children, position,
  } = props;

  const { isMobile: mobile } = useContext(ParamsContext);

  const handleClick = (e: Event): void => {
    if (!isMobile()) {
      if (!(selfNode?.current && selfNode?.current?.contains(e.target as Node | null))) {
        props.close();
      }
    }
  };

  const keyListener = (e: KeyboardEvent) => {
    // eslint-disable-next-line no-param-reassign
    e = e || window.event;
    switch (e.keyCode) {
      default:
        break;
      case 27:
        close();
        break;
    }
  };

  useEffect(() => {
    document.addEventListener("mousedown", handleClick);
    window.addEventListener("keydown", keyListener);
    return () => {};
  });

  const cn = classNames({
    "modal--box": true,
    [`modal--position_${position}`]: position,
  });

  if (!opened) {
    return <div />;
  }

  return mobile ? (
    <div className="modal">
      <div className="modal--close_button">
        <div className="modal--close_button_fixed" onClick={close}>
          <span>Закрыть</span>
        </div>
      </div>
      <div>{children}</div>
    </div>
  ) : (
    <div className="modal">
      <div className="modal--overlay">
        <div
          ref={selfNode}
          className={cn}
          style={{
            width,
          }}>
          {children}
        </div>
      </div>
    </div>
  );
};

const toggleDocumentScrolling = (status: boolean) => {
  document.body.style.overflow = status ? "scroll" : "hidden";
};

Modal.defaultProps = {
  width: "auto",
  opened: false,
  close: () => {},
  position: undefined,
};

export default React.memo(Modal, (prevProps, nextProps) => {
  toggleDocumentScrolling(!nextProps.opened);
  return false;
});
