import "./index.scss";
import React from "react";
import { useSelector } from "react-redux";
import { useWeb3React } from "@web3-react/core";
import { PAGE_ROUTES } from "../../../definitions";
import useGetNetworks from "../../../hooks/useGetNetworks";
import { ReactComponent as LoaderSVG } from "../../../static/images/svg/loader.svg";
import TokenCard from "../TokenCard";
import Button from "../../ui/universal/Button";
import router from "../../../router";
import { OrderStatus, OrderComponentProps } from "./Order.model";
import { getHashBridgeContract } from "../../../services/web3network/utils/contractHelpers";
import { checkChain } from "../../../utils/checkChain";
import { BlockChainConfig } from "../../../store/reducers/common/model";

const Order: React.FC<OrderComponentProps> = (props) => {
  const {
    order: { token, price, status },
  } = props;
  const nets = useSelector((state: { common: { blockchainConfig: BlockChainConfig } }) => state.common.blockchainConfig);
  const { currentNetwork } = useGetNetworks();
  const { account, chainId, library } = useWeb3React();

  const bridgeContract = currentNetwork ? getHashBridgeContract(currentNetwork.contractAddress, chainId, library.getSigner()) : null;

  const withdrawHandler = async () => {
    props.setActive(true);
    bridgeContract?.withdrawTokens(props.order.idInContract, props.order.paymentSignature, { from: account })
      .then((result: any) => result.wait())
      .then(() => {
        window.localStorage.setItem(`order${props.order.id}`, "withdrawn");
        props.setActive(false);
      })
      .finally(() => {
        window.localStorage.setItem(`order${props.order.id}`, "withdrawn");
        props.setActive(false);
      });
  };

  const onChangeChain = () => {
    checkChain(chainId, props.order.token.netId, nets[props.order.token.netId], () => {});
  };

  // eslint-disable-next-line consistent-return
  const getAction = () => {
    switch (status) {
      case OrderStatus.finished:
        return <p className="Order__label Order__label--success">Finished</p>;
      case OrderStatus.processing:
        return (
          <Button
            rounded
            shadow
            mode="secondary"
            onClick={() => {
              router.navigate(PAGE_ROUTES.ORDER, { id: props.order.id });
            }}>
            Pay
          </Button>
        );
      case OrderStatus.withdrawing:
        if (props.isActive) {
          return <LoaderSVG className="Order__loader" />;
        }
        
        if (chainId !== props.order.token.netId) {
          return (
            <Button rounded={true} shadow={true} mode={"secondary"} onClick={onChangeChain}>
              Change chain
            </Button>
          );
        }

        return (
          <Button rounded={true} shadow={true} mode={"secondary"} onClick={withdrawHandler}>
            Withdraw
          </Button>
        );
        
      case OrderStatus.expired:
        return <p className="Order__label Order__label--expired">Expired</p>;
      default:
        break;
    }
  };

  const getStatus = () => (
    <section
      className={`Order__action ${
        status === OrderStatus.finished || status === OrderStatus.expired ? "Order__action--label" : ""
      }`}>
      {getAction()}
    </section>
  );

  return (
    <article className="Order">
      <div className="Order__wrapper-primary">
        <div className="Order__wrapper-secondary">
          <div className="Order__section">
            <TokenCard title={"Token"} name={token.net} value={token.value} />
          </div>
          <div className="Order__section">
            <TokenCard title={"Price"} name={price.net} value={price.value} />
          </div>
        </div>
        {getStatus()}
      </div>
    </article>
  );
};

export default Order;
