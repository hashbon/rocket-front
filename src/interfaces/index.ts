export type FormStatusType = "default" | "error" | "valid";

export type AlignType = "left" | "center" | "right";

export type OldRef<T> = (el: T) => void;

export type RefWithCurrent<T> = {
  current: T | null;
};

export type Ref<T> = OldRef<T> | RefWithCurrent<T>;

export interface HasRootRef<T> {
  getRootRef?: Ref<T>;
}

export interface HasRef<T> {
  getRef?: Ref<T>;
}

export interface HasDangerHTML {
  dangerouslySetInnerHTML?: {
    __html: string;
  };
}

export interface HasFormStatus {
  status?: FormStatusType;
}

export interface HasFormLabels {
  top?: React.ReactNode;
  bottom?: React.ReactNode;
}

export interface HasAlign {
  align?: AlignType;
}

export interface HasChildren {
  children?: React.ReactNode;
}

export interface Web3CallbackInterface {
  onConfirm?: (data: any) => void;
  onReceipt?: (data: any) => void;
  onError?: (data: any) => void;
}
