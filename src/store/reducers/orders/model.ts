import { Order } from "../../actions/orders-actions/orders-actions.model";

export interface OfferForExchanger {
  id: number;
  rate: number;
  payAddress: string;
  address: string;
  minPurchase: number;
  token: string;
  amount: number;
  orders: Order[];
}
