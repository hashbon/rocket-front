import React, { useCallback, useEffect, useMemo, useRef } from "react";
import { marginStyleTreatment, ModalProps, useOnClickOutside } from "./modal.utils";

type ClickCallbackSign = (e: React.MouseEvent<HTMLButtonElement>) => void;

export const useModalLogic = (props: ModalProps) => {
  const selfNode = useRef<HTMLDivElement | null>(null);
  const {
    top,
    right,
    bottom,
    left,
    onAfterOpen,
    onAfterClose,
    withoutLayout,
    setIsVisibleController,
    isVisible = false,
  } = props;

  const handleChangeVisible: ClickCallbackSign = useCallback(() => {
    setIsVisibleController?.(!isVisible);
  }, [isVisible, setIsVisibleController]);

  const handleKeyboardEvent = useCallback(
    (event: KeyboardEvent) => {
      const keyPressed = event.keyCode;
      if (keyPressed === 27) {
        setIsVisibleController?.(false);
      }
    },
    [setIsVisibleController],
  );

  useEffect(() => {
    if (isVisible) {
      onAfterOpen?.();
    } else {
      onAfterClose?.();
    }
  }, [isVisible, onAfterClose, onAfterOpen]);

  useEffect(() => {
    window.addEventListener("keydown", handleKeyboardEvent);
    return () => {
      window.removeEventListener("keydown", handleKeyboardEvent);
    };
  }, [handleKeyboardEvent]);

  useOnClickOutside(selfNode, () => setIsVisibleController?.(false));

  const marginStyle = useMemo(
    () => marginStyleTreatment({ top, right, bottom, left, inline: withoutLayout }),
    [bottom, left, right, top, withoutLayout],
  );

  return {
    selfNode,
    handleChangeVisible,
    marginStyle,
  };
};
