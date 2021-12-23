import "./index.scss";
import React, { useState } from "react";
import classNames from "classnames";
import { ReactComponent as LogoSVG } from "../../../../../static/images/svg/logo_full.svg";
import { ReactComponent as Burger } from "../../../../../static/images/svg/burger.svg";
import { PAGE_ROUTES } from "../../../../../definitions";
import { useMobileDetect } from "../../../../../hooks/useMobileDetect";
import router5 from "../../../../../router";
import ConnectToWalletButton from "../../../../../components/common/ConnectToWalletButton";
import useLangs from "../../../../../hooks/useLangs";

const SidebarNavigation = () => {
  const { isMobile } = useMobileDetect();
  const { languages } = useLangs();
  const { name: routeName } = router5.getState();
  const [isShowed, setShowed] = useState(false);

  const renderNavigation = () => {
    const navigationList = [
      {
        title: languages.exchange,
        active: routeName === PAGE_ROUTES.SWAP,
        onClick: () => router5.navigate(PAGE_ROUTES.SWAP),
      },
      {
        title: languages.orders,
        active: routeName === PAGE_ROUTES.ORDERS,
        onClick: () => router5.navigate(PAGE_ROUTES.ORDERS),
      },
      {
        title: languages.invest,
        active: routeName === PAGE_ROUTES.POOLS,
        onClick: () => router5.navigate(PAGE_ROUTES.POOLS),
      },
      {
        title: "Stake",
        active: routeName === PAGE_ROUTES.EARN,
        onClick: () => router5.navigate(PAGE_ROUTES.EARN),
      },
    ];

    return (
      <div className="SidebarNavigation__list">
        {navigationList.map((item) => (
          <div
            key={`navigationKey_${item.title}`}
            className={classNames("SidebarNavigation__item", {
              active: item.active,
            })}
            onClick={() => {
              setShowed(false);
              item.onClick();
            }}>
            <div className="SidebarNavigation__item_title">{item.title}</div>
          </div>
        ))}
      </div>
    );
  };

  return (
    <div className="SidebarNavigation">
      <div className="SidebarHeader">
        <div className="SidebarHeader__container">
          <div
            className="SidebarHeader__menu"
            onClick={() => {
              setShowed(!isShowed);
            }}>
            <Burger />
          </div>
          <div
            className="SidebarHeader__logo"
            onClick={() => {
              router5.navigate(PAGE_ROUTES.MAIN);
            }}>
            <LogoSVG />
          </div>
          <div className="SidebarHeader__connect">
            <ConnectToWalletButton showAddress={isShowed} />
          </div>
        </div>
      </div>
      <div className={classNames("SidebarNavigation__collapse", { hide: isMobile && !isShowed })}>
        <div className="SidebarNavigation__container">{renderNavigation()}</div>
      </div>
    </div>
  );
};

export default SidebarNavigation;
