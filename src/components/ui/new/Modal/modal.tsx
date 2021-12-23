import "./modal.scss";
import React, { useMemo } from "react";
import { ModalProps, ModalTypes, MODAL_DEFAULT_WIDTH } from "./modal.utils";
import { ReactComponent as CloseIcon24 } from "./icons/close-24.svg";
import { useModalLogic } from "./modal.logic";
import * as ModalIcons from "./icons";
import Button from "../../../ui/universal/Button";
import { IPropsComponent as ButtonProps } from "../../universal/Button/assets/interfaces";

const ModalComponent: React.FC<ModalProps> = (props) => {
  const {
    title,
    icon,
    width,
    buttons,
    children,
    isVisible,
    maxHeight,
    description,
    withoutLayout = false,
    type = ModalTypes.Default,
    setIsVisibleController = undefined,
  } = props;
  const { selfNode, handleChangeVisible, marginStyle } = useModalLogic(props);

  const iconElement = useMemo(() => {
    const getTypeIcon = () => {
      switch (type) {
        case ModalTypes.Danger:
        case ModalTypes.Warning:
          return <ModalIcons.Exclamation24 />;
        case ModalTypes.Success:
          return <ModalIcons.Check24 />;
        default:
          return <ModalIcons.Info24 />;
      }
    };
    return icon || getTypeIcon();
  }, [icon, type]);

  const footer = useMemo(() => {
    let footerContent = null;
    if (typeof buttons === "object") {
      if (Array.isArray(buttons)) {
        footerContent = buttons.map((item: ButtonProps, index: number) => (
          <Button key={`actionPanelButton${index}`} {...item}>
            {item.children}
          </Button>
        ));
      }
    }
    return <div className="ModalComponent_footer">{footerContent}</div>;
  }, [buttons]);

  const content = useMemo(
    () => (
      <div className="ModalComponent_wrapper" ref={selfNode}>
        {!!setIsVisibleController && (
          // eslint-disable-next-line @typescript-eslint/ban-ts-comment
          // @ts-ignore
          <div className="ModalComponent_close" onClick={handleChangeVisible}>
            <CloseIcon24 />
          </div>
        )}
        <div className="ModalComponent_icon_wrapper">
          <div className="ModalComponent_icon">{iconElement}</div>
        </div>
        <div className="ModalComponent_content_wrapper">
          <div className="ModalComponent_title">{title}</div>
          {description && <div className="ModalComponent_description">{description}</div>}
          {children && (
            <div className="ModalComponent_content" style={{ maxHeight }}>
              {children}
            </div>
          )}
        </div>
        {footer}
      </div>
    ),
    [
      children,
      description,
      footer,
      handleChangeVisible,
      iconElement,
      maxHeight,
      selfNode,
      setIsVisibleController,
      title,
      type,
    ],
  );

  const layoutTreatment = useMemo(
    () =>
      withoutLayout ? (
        <div
          className="ModalComponent_absolute_wrapper"
          style={{
            width: `${width}px` ?? `${MODAL_DEFAULT_WIDTH}px`,
            ...marginStyle,
          }}>
          {content}
        </div>
      ) : (
        <div className="ModalComponent_fixed_wrapper">
          <div
            className="ModalComponent_relative_wrapper"
            style={{
              width: `${width}px` ?? `${MODAL_DEFAULT_WIDTH}px`,
              ...marginStyle,
            }}>
            {content}
          </div>
        </div>
      ),
    [content, marginStyle, width, withoutLayout],
  );

  return isVisible ? layoutTreatment : null;
};

export const Modal = React.memo(ModalComponent);
