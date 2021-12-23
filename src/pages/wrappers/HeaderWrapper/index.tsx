import "./index.scss";
import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import { useWeb3React } from "@web3-react/core";
import useOnLoad from "../../../hooks/useOnLoad";
import { useMobileDetect } from "../../../hooks/useMobileDetect";
import { commonActions, ordersActions, TYPES } from "../../../store/actions";
import HeaderNavigation from "./components/HeaderNavigation";
import SidebarWrapper from "../SidebarWrapper";

const HeaderWrapper: React.FC = (props) => {
  const dispatch = useDispatch();
  const { onloaded } = useOnLoad();
  const { isMobile } = useMobileDetect();
  const { active, account, chainId } = useWeb3React();

  const UPDATE_TIME = 10 * 1000;

  let updater: ReturnType<typeof setInterval>;

  const doFetch = () => {
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
    dispatch(commonActions.getHashPrice());
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

  const renderWrapper = () => {
    if (isMobile) return <SidebarWrapper>{props.children}</SidebarWrapper>;

    return (
      <div className="Page">
        <div className="Page-inner display_flex">
          <div className="HeaderWrapper__nav">
            <HeaderNavigation />
          </div>

          <div className="HeaderWrapper__container">
            <div className="HeaderWrapper_PageContainer">
              <div className="HeaderWrapper_PageContainer_main">{props.children}</div>
            </div>
          </div>
        </div>
      </div>
    );
  };

  return <>{renderWrapper()}</>;
};

export default HeaderWrapper;
