import "./index.scss";
import React from "react";
import useGetNetworks from "../../../../../../../hooks/useGetNetworks";
import { Offer as OfferType } from "../../../../../../../store/actions/orders-actions/orders-actions.model";

interface IOfferProps {
  offer: OfferType;
}

const Offer: React.FC<IOfferProps> = ({ offer }) => {
  const { getNetworkById } = useGetNetworks();
  const networkExchange = getNetworkById(offer.token.netId);
  const networkPay = getNetworkById(offer.payToken.netId);

  const renderToken = (amount: string, symbol: string, net: string) => (
    <div className="SwapFormOffer_Token">
      <div className="SwapFormOffer_Token_Amount">{amount}</div>
      <div className="SwapFormOffer_Token_Symbol">{symbol}</div>
      <div className="SwapFormOffer_Token_Net">({net})</div>
    </div>
  );

  return (
    <div className="SwapFormOffer">
      {renderToken("1", offer.token.symbol, networkExchange.name)}
      <div className="SwapFormOffer_Separator">-</div>
      {renderToken(offer.rate.toString(), offer.payToken.symbol, networkPay.name)}
    </div>
  );
};

export default Offer;
