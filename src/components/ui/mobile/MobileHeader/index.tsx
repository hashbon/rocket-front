import "./style.scss";
import React, { useState, useEffect } from "react";
import classNames from "classnames";
import { IPropsComponent } from "./assets/interfaces";

const MobileHeader: React.FC<IPropsComponent> = (props) => {
  const { contextOpened, context, children, contextCloseHandler, left, right } = props;

  const [headerScrollPoint, setHeaderScrollPoint] = useState(false);

  const handleScroll = (): void => {
    setHeaderScrollPoint(window.pageYOffset > 0);
  };

  const mainStyles = classNames({
    "mobile-header--main": true,
    "mobile-header--shadow": headerScrollPoint,
  });

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  });

  return (
    <header className="mobile-header no_select">
      <div className="mobile-header--wrapper">
        <div className="mobile-header--wrapper_content">
          <div className={mainStyles}>
            <div className="mobile-header--main_up">
              {!!left && <div className="mobile-header--main_left">{left}</div>}
              <div className="mobile-header--main_center">{children}</div>
              <div className="mobile-header--main_right">{right}</div>
            </div>

            <div
              className="mobile-header--main_bottom"
              style={
                contextOpened
                  ? {}
                  : {
                    height: 0,
                  }
              }>
              <div
                className="mobile-header--main_bottom_content"
                style={
                  contextOpened
                    ? {}
                    : {
                      marginTop: -50,
                      opacity: 0,
                    }
                }>
                {contextOpened && context}
              </div>
              {contextOpened && <div className="mobile-header--main_bottom_close" onClick={contextCloseHandler} />}
            </div>
          </div>
          <div className="mobile-header--fake" />
        </div>
      </div>
    </header>
  );
};

const toggleDocumentScrolling = (status: boolean) => {
  document.body.style.overflow = status ? "scroll" : "hidden";
};

MobileHeader.defaultProps = {
  contextOpened: false,
  context: undefined,
  left: undefined,
  right: <></>,
  contextCloseHandler: () => {},
};

export default React.memo(MobileHeader, (prevProps, nextProps) => {
  toggleDocumentScrolling(!nextProps.contextOpened);
  return false;
});
