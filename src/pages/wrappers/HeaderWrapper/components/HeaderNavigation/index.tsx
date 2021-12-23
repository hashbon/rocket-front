import "./index.scss";
import React, { useState } from "react";
import LogoSVG from "../../../../../static/images/svg/logo.svg";
import RocketSVG from "../../../../../static/images/svg/rocket.svg";
import { ReactComponent as Burger } from "../../../../../static/images/svg/burger.svg";
import { PAGE_ROUTES } from "../../../../../definitions";
import { useMobileDetect } from "../../../../../hooks/useMobileDetect";
import router5 from "../../../../../router";
import ConnectToWalletButton from "../../../../../components/common/ConnectToWalletButton";
import useLangs from "../../../../../hooks/useLangs";
import NavTumbler from "../../../../../components/common/NavTumbler";
import { switchMatch } from "../../../../../utils";

const HeaderNavigation = () => {
  const { isMobile } = useMobileDetect();
  const { languages } = useLangs();
  const { name: routeName } = router5.getState();
  const [isShowed, setShowed] = useState(false);

  const navTumblerHandler = (pos: any) => {
    router5.navigate(
      switchMatch(pos, {
        1: PAGE_ROUTES.SWAP,
        2: PAGE_ROUTES.ORDERS,
        3: PAGE_ROUTES.POOLS,
        4: PAGE_ROUTES.EARN,
      }),
    );
  };

  return (
    <div className="HeaderNavigation">
      <div className="MainHeader">
        <div className="MainHeader__container">
          <div
            className="MainHeader_logoWrapper display_flex"
            onClick={() => {
              router5.navigate(PAGE_ROUTES.MAIN);
            }}>
            <div className="first_part" style={{ backgroundImage: `url(${LogoSVG})` }} />
            <div className="second_part" style={{ backgroundImage: `url(${RocketSVG})` }} />
          </div>
          <div className="MainHeader_tumblerWrapper">
            <div className="MainHeader_tumblerWrapper__container">
              <NavTumbler
                firstTitle={languages.exchange}
                secondTitle={languages.orders}
                thirdTitle={languages.invest}
                fortyTitle={languages.stake}
                position={switchMatch(routeName, {
                  [PAGE_ROUTES.SWAP]: 1,
                  [PAGE_ROUTES.ORDERS]: 2,
                  [PAGE_ROUTES.POOLS]: 3,
                  [PAGE_ROUTES.EARN]: 4,
                })}
                onChangeHandler={navTumblerHandler}
              />
            </div>
          </div>
          {!isMobile && (
            <div className="HeaderWrapper__connect">
              <ConnectToWalletButton />
            </div>
          )}
          <div
            className="MainHeader__menu"
            onClick={() => {
              setShowed(!isShowed);
            }}>
            <Burger />
          </div>
          <div className="MainHeader__connect">
            <ConnectToWalletButton showAddress={isShowed} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default HeaderNavigation;
