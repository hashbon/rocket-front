import "./index.scss";
import React from "react";
import classNames from "classnames";

interface TokenCardProps {
  image?: React.ReactNode,
  title: string,
  name: string,
  value: string,
  address?: string,
}

const TokenCard: React.FC<TokenCardProps> = (props: TokenCardProps) => (
  <div className="TokenCard TokenCard__column">
    <div className={classNames("TokenCard__title", { TokenCard__margin: props.image })}>{props.title}</div>
    <div className="TokenCard__row">
      {props.image && <div className="TokenCard__image">{props.image}</div>}
      <div className="TokenCard__column">
        <div className="TokenCard__name">{props.name}</div>
        <div className="TokenCard__value">{props.value}</div>
        {props.address && <div className="TokenCard__address">{props.address}</div>}
      </div>
    </div>
  </div>
);

export default TokenCard;
