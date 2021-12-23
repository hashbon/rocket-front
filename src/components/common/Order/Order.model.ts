import { WithActiveProps } from "../../hocs/withActive";

export enum OrderStatus {
  processing = "processing ",
  withdrawing = "withdrawing",
  finished = "finished",
  expired = "expired",
}

export interface OrderPropsItem {
  id: number;
  idInContract: string;
  isWithdrawn: boolean;
  paymentSignature: string;
  price: { value: string; net: string, netId: number };
  token: { value: string; net: string, netId: number };
  status: OrderStatus;
}

export interface OrderProps {
  order: OrderPropsItem;
}

export interface OrderComponentProps extends OrderProps, WithActiveProps {}
