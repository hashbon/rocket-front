import "./index.scss";
import React from "react";
import { Link } from "react-router5";
import { useSelector } from "react-redux";
import { useWeb3React } from "@web3-react/core";
import { OrderComponentProps, OrderPropsItem, OrderStatus } from "components/common/Order/Order.model";
import useLangs from "../../../hooks/useLangs";
import { PAGE_ROUTES } from "../../../definitions";
import { Order } from "../../../store/actions/orders-actions/orders-actions.model";
import { AccentWindowWrapper } from "../../../components/common/AccentWindowWrapper";
import { WindowTabs } from "../../../components/common/WindowTabs";
import { withTabs } from "../../../components/hocs/withTabs";
import { withActive } from "../../../components/hocs/withActive";
import OrderComponent from "../../../components/common/Order";
import Spacer from "../../../components/ui/universal/Spacer";
import { trimAccount } from "../../../utils";
import { BlockChainConfig } from "../../../store/reducers/common/model";
import TokenCard from "../../../components/common/TokenCard";
import useGetTokens from "../../../hooks/useGetTokens";

const WindowTabsWithTabs = withTabs(WindowTabs);
const WithActiveOrderComponent = withActive<OrderComponentProps>(OrderComponent);

const OrdersPage = () => {
  const { languages } = useLangs();
  const { account } = useWeb3React();
  const orders: Order[] = useSelector((state: any) => state.orders.clientOrders);
  const awaitingOrders: any[] = useSelector((state: any) => state.orders.awaitingOrders);
  const blockchainConfig: BlockChainConfig = useSelector((state: any) => state.common.blockchainConfig);
  const { getTokenById } = useGetTokens();
  const getNetName = (id: number): string => blockchainConfig[id]?.name || "";

  const renderAwaitingOrder = (token: any, price: any) => (
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
        <section className={"Order__action Order__action--label"}>SYNC</section>
      </div>
    </article>
  );

  const getTab = (title: string, items: OrderPropsItem[], extraItems: any[]) => ({
    title,
    disabled: !(items.length + extraItems.length),
    el: (
      <ul className="OrdersPage__list">
        {extraItems.map((order, i) => (
          <li key={i} className="OrdersPage__list-item">
            {renderAwaitingOrder(
              {
                net: getNetName(getTokenById(order.to).netId),
                value: `${order.amount} ${getTokenById(order.to).symbol}`,
              },
              {
                net: getNetName(getTokenById(order.from).netId),
                value: `${order.payAmount} ${getTokenById(order.from).symbol}`,
              },
            )}
          </li>
        ))}
        {items.map((order, i) => (
          <li className="OrdersPage__list-item" key={i}>
            <WithActiveOrderComponent order={order} />
          </li>
        ))}
      </ul>
    ),
  });

  const getStatus = (order: Order) => {
    const isExpired = order.reservedUntil < Math.floor(Date.now() / 1000);

    if (!order.complete) {
      if (!order.payments?.length && !isExpired) {
        return OrderStatus.processing;
      }
      if (order.payments?.length && localStorage.getItem(`order${order.id}`) !== "withdrawn") {
        return OrderStatus.withdrawing;
      }

      if (isExpired) {
        return OrderStatus.expired;
      }
    }

    return OrderStatus.finished;
  };

  const viewOrders = orders.map((order) => ({
    id: order.id,
    idInContract: order.idInContract,
    isWithdrawn: !!localStorage.getItem(`order${order.id}`),
    paymentSignature: (order?.payments?.length && order.payments[order.payments.length - 1].signature) || "",
    token: {
      value: `${order.amount} ${order.offer.token.name}`,
      net: getNetName(order.offer.token.netId),
      netId: order.offer.token.netId,
    },
    price: {
      value: `${order.payAmount} ${order.offer.payToken.name}`,
      net: getNetName(order.offer.payToken.netId),
      netId: order.offer.payToken.netId,
    },
    status: getStatus(order),
  }));

  const processingOrders = viewOrders.filter(
    (item) => item.status === OrderStatus.processing || item.status === OrderStatus.withdrawing,
  );

  const finishedOrders = viewOrders.filter((item) => item.status === OrderStatus.finished);

  const expiredOrders = viewOrders.filter((item) => item.status === OrderStatus.expired);

  const all = getTab("All", viewOrders, awaitingOrders);
  const processing = getTab("Processing", processingOrders, awaitingOrders);
  const finished = getTab("Finished", finishedOrders, []);
  const expired = getTab("Expired", expiredOrders, []);

  const tabs = [all, processing, finished, expired];

  const getContent = () => {
    if (!(orders?.length + awaitingOrders.length)) {
      return (
        <section className="OrdersPage__empty-block">
          <h4 className="OrdersPage__empty-title">No created orders</h4>
          <p className="OrdersPage__empty-message">
            Go to{" "}
            <Link className="OrdersPage__empty-link" routeName={PAGE_ROUTES.SWAP}>
              Swap
            </Link>
            <br />
            or Please wait if u already created
          </p>
        </section>
      );
    }

    return <WindowTabsWithTabs>{tabs}</WindowTabsWithTabs>;
  };

  const tooltipContent = (
    <div>
      <p>
        List orders for account {trimAccount(account)}. You can choose another account in wallet.
      </p>
      <Spacer size={6} />
      <p>
        Don`t worry if you don`t see your recently added order here, or if your order status hasn`t changed to `Paid`
        after you paid. It will be updated in a few minutes.
      </p>
    </div>
  );

  return (
    <section className="OrdersPage">
      <AccentWindowWrapper tooltip={tooltipContent} title={languages.orders}>
        {getContent()}
      </AccentWindowWrapper>
    </section>
  );
};

export default OrdersPage;
