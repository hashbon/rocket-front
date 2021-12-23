export interface Order {
  id: number;
  netId: number;
  offer: Offer;
  idInContract: string;
  ownerAddress: string;
  withdrawAddress: string;
  payAddress: string;
  amount: number;
  amount16: string;
  payAmount: number;
  payAmount16: string;
  rate: number;
  rate16: string;
  reservedUntil: number;
  complete: boolean;
  createdAt: number;
  updatedAt: number;
  payments?: PaymentsEntity[] | null;
  isWithdrawn?: boolean;
  paid?: boolean;
}
export interface Offer {
  id: number;
  netId: number;
  token: PayToken;
  payToken: PayToken;
  amount: number;
  blockedAmount: number;
  freeAmount: number;
  amount16: string;
  minPurchase: number;
  minPurchase16: string;
  rate: number;
  rate16: string;
  active: boolean;
  ownerAddress: string;
  payAddress: string;
  idInContract: string;
  createdAt: number;
  updatedAt: number;
  minPurchasePrice: number;
  maxPurchasePrice: number;
  orders: Order[];
}

export interface PayToken {
  id: number;
  netId: number;
  address: string;
  name: string;
  symbol: string;
  decimals: number;
  verified: boolean;
  createdAt: number;
  updatedAt?: string | null;
}

export interface PaymentsEntity {
  id: number;
  netId: number;
  idInContract: string;
  payAddress: string;
  payToken: PayToken;
  payAmount: number;
  payAmount16: string;
  createdAt: number;
  signature: string;
}
