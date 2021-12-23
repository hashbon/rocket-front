import "./index.scss";
import React, { useEffect, useState } from "react";
import { useWeb3React } from "@web3-react/core";
import Spacer from "../../ui/universal/Spacer";
import useGetOffersForExchanger from "../../../hooks/useGetOffersForExchanger";
import useGetNetworks from "../../../hooks/useGetNetworks";
import router from "../../../router";
import { PAGE_ROUTES } from "../../../definitions";
import Card from "../../../components/ui/universal/Card";
import Button from "../../ui/universal/Button";
import { getIconNetworkById } from "../../../utils";
import TokenCard from "../TokenCard";
import { Order as OrderType, Offer } from "../../../store/actions/orders-actions/orders-actions.model";
import { getHashBridgeContract } from "../../../services/web3network/utils/contractHelpers";
import { getHashBridgeAddress } from "../../../services/web3network/utils/addressHelper";

interface IPoolProps {
  offer: Offer,
}

const Pool: React.FC<IPoolProps> = ({ offer }) => {
  const [isMoreHidden, setIsMoreHidden] = useState(false);
  const { getCountersForOffer } = useGetOffersForExchanger();
  const { getNetworkById } = useGetNetworks();
  const { account, chainId, library } = useWeb3React();
  const [counters, setCounters] = useState({ paid: 0, reserved: 0, left: 0 });
  const [waitWallet, setWaitWallet] = useState(false);
  const [waitActive, setWaitActive] = useState(false);
  const [waitDeactivate, setWaitDeactivate] = useState(false);

  useEffect(() => {
    setCounters(getCountersForOffer(offer));
  }, [offer]);

  const networkExchange = getNetworkById(offer.token.netId);
  const networkPay = getNetworkById(offer.payToken.netId);
  const bridgeContract = getHashBridgeContract(
    getHashBridgeAddress(chainId),
    chainId,
    library.getSigner(),
  );

  const togglePool = () => {
    if (!offer || waitWallet) return;

    if (offer.active) {
      if (waitDeactivate) return;

      setWaitWallet(true);

      bridgeContract?.deactivateOffer(offer.idInContract, { from: account })
        .then((result: any) => result.wait())
        .then(() => {
          setWaitDeactivate(true);
          setWaitActive(false);
          setWaitWallet(false);
        })
        .catch(() => {
          setWaitWallet(false);
        })
        .finally(() => {
          setWaitWallet(false);
        });
    }
    if (!offer.active) {
      if (waitActive) return;

      setWaitWallet(true);

      bridgeContract?.activateOffer(offer.idInContract, { from: account })
        .then((result: any) => result.wait())
        .then(() => {
          setWaitDeactivate(false);
          setWaitActive(true);
          setWaitWallet(false);
        })
        .catch(() => {
          setWaitWallet(false);
        })
        .finally(() => {
          setWaitWallet(false);
        });
    }
  };

  const renderMore = () => (
    <div>
      <Spacer size={6} />

      <div className="Pool__column">
        <div className="Pool__title">{`Your ETH address for payments: ${offer.payAddress}`}</div>

        <Spacer size={3} />

        <div className="Pool__column_info">
          <div className="Pool__column_info_column">
            <span>Tokens blocked:</span>
          </div>

          <div className="Pool__column_info_column Pool__column_info_column_right">
            <span>{counters.reserved}</span>
          </div>
        </div>

        <div className="Pool__column_info">
          <div className="Pool__column_info_column">
            <span>Minimum purchase:</span>
          </div>

          <div className="Pool__column_info_column Pool__column_info_column_right">
            <span>{offer.minPurchase}</span>
          </div>
        </div>
      </div>

      <Spacer size={6} />

      {/* eslint-disable-next-line @typescript-eslint/no-use-before-define */}
      {offer.orders.length > 0 && renderOrderHistory()}
      <Spacer size={6} />
    </div>
  );

  const renderOrderHistory = () => (
    <>
      <div className="Pool_column">
        <div className="Pool_column_title_white">Orders history</div>
      </div>

      <Card
        className="Pool_orders"
        horizontalPadding={2}
        verticalPadding={2}
        bordered={true}
        rounded={true}
        background={"transparent"}
        shadow={false}>
        {offer.orders.map((order: OrderType) => (
          // eslint-disable-next-line react/jsx-key
          <div className="Pool_orders_columns">
            <div className="Pool_orders_column">
              <TokenCard title={"Token"} name={`${offer.token.symbol} ${networkExchange.name}`} value={String(order.amount)} />
            </div>

            <div className="Pool_orders_column">
              <TokenCard title={"Price"} name={`${offer.payToken.symbol} ${networkPay.name}`} value={String(order.payAmount)} />
            </div>

            <div className="Pool_orders_column Pool_orders_column_small">
              <div className="Pool_orders_column_context">
                {/* eslint-disable-next-line no-nested-ternary */}
                {order.complete || order.isWithdrawn
                  ? "Finished"
                  : // eslint-disable-next-line no-nested-ternary
                  order.paid
                    ? "Paid"
                    : order.reservedUntil < Math.floor(new Date().getTime() / 1000)
                      ? "Expired"
                      : "Payment awaiting"}
              </div>
            </div>
          </div>
        ))}
      </Card>
    </>
  );

  const renderMain = () => (
    <Card
      className={"Pool"}
      verticalPadding={3}
      shadow={false}
      bordered={false}
      rounded={false}
      background={"transparent"}>
      <div className="Pool__container">
        <div className="Pool__column">
          <TokenCard
            title={"Amount"}
            image={(() => {
              const Icon = getIconNetworkById(networkExchange.id);
              return <Icon />;
            })()}
            name={`${offer.token.symbol} (${networkExchange.name})`}
            value={String(offer.amount)}
            address={offer.token.address}
          />
        </div>
        <div className="Pool__column">
          <TokenCard
            title={"Rate"}
            image={(() => {
              const Icon = getIconNetworkById(networkPay.id);
              return <Icon />;
            })()}
            name={`${offer.payToken.symbol} (${networkPay.name})`}
            value={String(offer.rate)}
            address={offer.payToken.address}
          />
        </div>
      </div>

      <Spacer size={6} />
      <div className="Pool__column">
        <div className={`Pool__status ${offer.active && "Pool__status-active"}`}>
          <span>{offer.active ? "ACTIVE" : "INACTIVE"}</span>
        </div>
      </div>

      <div>{isMoreHidden && renderMore()}</div>

      <div className="Pool__column_footer">
        <div className="Pool__column_footer_left">
          <div className="Pool__column_footer_title" onClick={() => setIsMoreHidden(!isMoreHidden)}>
            <span>{isMoreHidden ? "Show less" : "Show more"}</span>
          </div>
        </div>

        <div className="Pool__column_footer_right">
          <div className="Pool__column_footer_title">
            <Button
              size={"medium"}
              mode={"accent"}
              rounded
              shadow={false}
              onClick={() => {
                router.navigate(PAGE_ROUTES.EDIT_POOL, { id: offer.id });
              }}>
              Edit
            </Button>
          </div>

          <div className="Pool__column_footer_title">
            <Button size={"medium"} mode={"outline-additional"} rounded shadow={false} onClick={togglePool}>
              {/* eslint-disable-next-line no-nested-ternary */}
              {waitWallet
                ? "Wait..."
                : // eslint-disable-next-line no-nested-ternary
                offer.active
                  ? waitDeactivate
                    ? "Deactivation in progress"
                    : "Deactivate"
                  : waitActive
                    ? "Activation in progress"
                    : "Activate"}
            </Button>
          </div>
        </div>
      </div>
    </Card>
  );

  return <>{renderMain()}</>;
};

export default Pool;
