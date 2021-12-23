import React, { ReactChild, ReactFragment, ReactPortal, RefObject, useEffect } from "react";
import { IPropsComponent as ButtonProps } from "../../universal/Button/assets/interfaces";

type ReactNode = ReactChild | ReactFragment | ReactPortal | boolean | null | undefined;

type MarginProp = string | number | undefined;

type MarginProps = {
  top?: MarginProp;
  right?: MarginProp;
  bottom?: MarginProp;
  left?: MarginProp;
  inline?: boolean;
};

export const MODAL_DEFAULT_WIDTH = 320;

export enum ModalTypes {
  Success = "success",
  Danger = "danger",
  Warning = "warning",
  Default = "default",
}

export type ModalProps = {
  /** Заголовок */
  title: string;
  /** Описание */
  description?: string;
  /** Кастомная иконка */
  icon?: React.ReactElement;
  /** Контент */
  children?: ReactNode | ReactNode[];
  /** Контент панели управления */
  buttons?: ButtonProps[];
  /** Тип модального окна */
  type?: ModalTypes;
  /** Статус отображения */
  isVisible?: boolean;
  /** Контроллер управлением статуса отображения */
  setIsVisibleController?: (isVisible: boolean) => void;
  /** Коллбэк после открытия */
  onAfterOpen?: () => void;
  /** Коллбэк после закрытия */
  onAfterClose?: () => void;
  /** Отобразить без фонового слоя */
  withoutLayout?: boolean;
  /** Положение окна */
  top?: "AUTO" | number;
  right?: "AUTO" | number;
  bottom?: "AUTO" | number;
  left?: "AUTO" | number;
  /** Ширина окна */
  width?: number;
  /** Максимальная высота контента */
  maxHeight?: number;
};

function marginPropTreatment(prop: MarginProp) {
  switch (typeof prop) {
    case "number":
      return `${prop}px`;
    case "undefined":
      return "";
    default:
      return "auto";
  }
}

export function marginStyleTreatment(props: MarginProps) {
  const { top = "auto", right = "auto", bottom = "auto", left = "auto", inline = false } = props;
  const inlinePrefix = inline ? "" : "margin";
  return {
    [`${inlinePrefix}Top`]: marginPropTreatment(top),
    [`${inlinePrefix}Right`]: marginPropTreatment(right),
    [`${inlinePrefix}Bottom`]: marginPropTreatment(bottom),
    [`${inlinePrefix}Left`]: marginPropTreatment(left),
  };
}

export function useOnClickOutside<T extends HTMLElement = HTMLElement>(
  ref: RefObject<T>,
  handler: (event: MouseEvent | TouchEvent) => void,
): void {
  useEffect(() => {
    const listener = (event: MouseEvent | TouchEvent) => {
      const el = ref?.current;

      if (!el || el.contains(event.target as Node)) {
        return;
      }

      handler(event);
    };

    document.addEventListener("mousedown", listener);
    document.addEventListener("touchstart", listener);

    return () => {
      document.removeEventListener("mousedown", listener);
      document.removeEventListener("touchstart", listener);
    };
  }, [ref, handler]);
}
