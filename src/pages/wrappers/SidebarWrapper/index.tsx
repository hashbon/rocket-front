import "./index.scss";
import React, { useEffect } from "react";
import classNames from "classnames";
import { batch, useDispatch } from "react-redux";
import { useWeb3React } from "@web3-react/core";
import useOnLoad from "../../../hooks/useOnLoad";
import { useMobileDetect } from "../../../hooks/useMobileDetect";
import { commonActions, ordersActions, TYPES } from "../../../store/actions";
import ConnectToWalletButton from "../../../components/common/ConnectToWalletButton";
import SidebarNavigation from "./components/SidebarNavigation";

const SidebarWrapper: React.FC = (props) => {
  const dispatch = useDispatch();
  const { onloaded } = useOnLoad();
  const { isMobile } = useMobileDetect();
  const { active, account, chainId } = useWeb3React();

  const UPDATE_TIME = 10 * 1000;

  let updater: ReturnType<typeof setInterval>;

  const doFetch = () => {
    batch(() => {
      dispatch(
        ordersActions.getOffersForExchanger({
          ownerAddress: account,
          netId: chainId,
        }),
      );
      dispatch(
        ordersActions.getOrdersForClient({
          ownerAddress: account,
        }),
      );
      dispatch(commonActions.getTokensAndOffers());
    });
  };

  useEffect(() => {
    if (account) {
      doFetch();
      // eslint-disable-next-line react-hooks/exhaustive-deps
      updater = setInterval(doFetch, UPDATE_TIME);
    } else {
      if (updater) {
        clearInterval(updater);
      }
      dispatch({
        type: TYPES.ORDERS.GET_ORDERS_FOR_EXCHANGER,
        payload: { orders: [] },
      });
      dispatch({
        type: TYPES.ORDERS.GET_OFFERS_FOR_EXCHANGER,
        payload: { offers: [] },
      });
      dispatch({
        type: TYPES.ORDERS.FETCH_ORDERS,
        payload: { orders: [] },
      });
    }
    return () => {
      if (updater) {
        clearInterval(updater);
      }
    };
  }, [active, account, chainId]);

  if (!onloaded) {
    return <div>Loading...</div>;
  }

  return (
    <div className="Page">
      <div
        className={classNames("Page-inner", {
          display_flex: !isMobile,
        })}>
        <div className="SidebarWrapper__nav">
          <SidebarNavigation />
        </div>

        <div className="SidebarWrapper__aside" />

        <div className="SidebarWrapper__container">
          {!isMobile && (
            <div className="SidebarWrapper__connect">
              <ConnectToWalletButton />
            </div>
          )}

          <div className="PageContainer">
            <div className="PageContainer_main">{props.children}</div>
          </div>
        </div>
        {isMobile && <div className="SidebarWrapper__sidebar_fake" />}
      </div>
    </div>
  );
};

export default SidebarWrapper;
