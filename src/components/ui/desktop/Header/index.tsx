// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-nocheck in
import "./index.scss";
import "react-flags-select/scss/react-flags-select.scss";
import React from "react";
import { useDispatch } from "react-redux";
import ReactFlagsSelect from "react-flags-select";
import Cookies from "js-cookie";
import Centered from "../../centered";
import { ReactComponent as MoreSvg } from "../../../../static/images/svg/others/1_more.svg";
import { commonActions } from "../../../../store/actions";
import * as DropActions from "../../universal/DropActions";
import router5 from "../../../../router";
import { PAGE_ROUTES } from "../../../../definitions";
import { switchMatch } from "../../../../utils";
import TabBar from "../../universal/TabBar";
import TabBarItem from "../../universal/TabBarItem";
import useLangs from "../../../../hooks/useLangs";
import ConnectToWalletButton from "../../../common/ConnectToWalletButton";

const Header = () => {
  const { languages } = useLangs();
  const dispatch = useDispatch();

  const { name: routeName } = router5.getState();

  return (
    <div className="Desktop-header_wrapper">
      <Centered flex>
        <div className="Desktop-header_logotype">
          <span>HASHBON.DEFI</span>
        </div>

        <div className="Desktop-header_tabs">
          <TabBar
            items={[
              {
                title: languages.info,
                active: routeName === PAGE_ROUTES.INFO,
                onClick: () => {
                  router5.navigate(PAGE_ROUTES.INFO);
                },
              },
              {
                title: languages.exchange,
                active: routeName === PAGE_ROUTES.EXCHANGE,
                onClick: () => {
                  router5.navigate(PAGE_ROUTES.EXCHANGE);
                },
              },
              {
                title: languages.orders,
                active: routeName === PAGE_ROUTES.ORDERS,
                onClick: () => {
                  router5.navigate(PAGE_ROUTES.ORDERS);
                },
              },
              {
                title: languages.invest,
                active: routeName === PAGE_ROUTES.INVEST,
                onClick: () => {
                  router5.navigate(PAGE_ROUTES.INVEST);
                },
              },
            ].map((item, i) => (
              // eslint-disable-next-line react/jsx-key
              <TabBarItem
                title={item.title}
                type="rounded"
                forKey={`tabbaritem_idx${i}`}
                active={item.active}
                onClick={item.onClick}
              />
            ))}
          />
        </div>

        <div className="Desktop-header_profile">
          <div className="Desktop-header_profile_wrapper">
            <DropActions.Main
              width={200}
              right={120}
              top={10}
              items={[
                {
                  title: "Support",
                  onClick: () => {},
                },
                {
                  title: "Documentation",
                  onClick: () => {},
                },
              ]}>
              <div className="Desktop-header_profile_title no_select">
                <div>
                  <span />
                </div>

                <MoreSvg />
              </div>
            </DropActions.Main>
          </div>
        </div>

        <div className="Desktop-header_languages">
          <ReactFlagsSelect
            placeholder="Select Language"
            defaultCountry={(() =>
              switchMatch(Cookies.get("lang") || "en", {
                en: "US",
                cs: "CZ",
                default: Cookies.get("lang")?.toUpperCase(),
              }).toUpperCase())()}
            countries={["US", "RU"]}
            customLabels={{ US: "EN", RU: "RU", CZ: "CZ", ES: "ES", DE: "DE" }}
            onSelect={(countryCode) => {
              const setLang = dispatch(commonActions.setCurrentLang(countryCode.toLocaleLowerCase()));
              // eslint-disable-next-line @typescript-eslint/ban-ts-comment
              // @ts-ignore
              setLang.then((data) => {
                dispatch(commonActions.getLangs());
              });
            }}
          />
        </div>

        <div className="Desktop-header_connect">
          <ConnectToWalletButton />
        </div>
      </Centered>
    </div>
  );
};

export default Header;
