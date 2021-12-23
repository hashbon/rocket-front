import "./index.scss";
import React, { useMemo, useState } from "react";
import { batch, useDispatch, useSelector } from "react-redux";
import Input from "../../components/ui/universal/Input";
import useOnLoad from "../../hooks/useOnLoad";
import useGetNetworks from "../../hooks/useGetNetworks";
import { getIconNetworkById, isMobile, switchMatch } from "../../utils";
import { commonActions } from "../../store/actions";
import classNames from "../../utils/classNames";
import { shortenAddress } from "../../services/web3network/utils";
import { ReactComponent as BackSVG } from "../../static/images/svg/back.svg";
import { ReactComponent as InfoSVG } from "./assets/icons/info.svg";

const SelectToken = (props: any) => {
  const [searchToken, setSearchToken] = useState("");

  const { onloaded } = useOnLoad();
  const dispatch = useDispatch();

  const swapForm = useSelector((state: any) => state.common.swapFrom);
  const offers = useSelector((state: any) => state.common.offers);

  const fromModalNetworks = useMemo(() => [...offers].map(({ payToken, token }) => ({ ...payToken, token })), [offers]);

  const toModalNetworks = useMemo(
    () =>
      [...offers]
        .map(({ token, payToken }) => ({ ...token, payToken }))
        .filter(
          (item) =>
            item.netId !== swapForm.from.netId &&
            item.payToken.netId === swapForm.from.netId &&
            item.payToken.id === swapForm.from.tokenId,
        ),
    [offers],
  );

  const { getNetworkById } = useGetNetworks();

  let type = "";
  switch (props.type) {
    default:
      props.close();
      break;
    case "to":
      // invert (!selectedNetworkIdFromModal || !selectedTokenIdFromModal && !(selectedTokenIdToModal || selectedNetworkIdToModal))
      type = props.type;
      break;
    case "from":
      type = props.type;
      break;
  }

  const [navState, setNavState] = useState(swapForm[type]?.netId ? "TOKEN" : "NETWORK");

  if (!onloaded) return <></>;

  let uniqueFromModalNetworks: any = new Map();
  let uniqueTokensFromModalNetworks: any = new Map();

  fromModalNetworks.forEach((item: any) => {
    uniqueFromModalNetworks.set(item.netId, { ...item });
    uniqueTokensFromModalNetworks.set(`${item.netId}-${item.address}`, { ...item });
  });

  uniqueFromModalNetworks = Array.from(uniqueFromModalNetworks, ([, value]) => ({ ...value }));

  uniqueTokensFromModalNetworks = Array.from(uniqueTokensFromModalNetworks, ([, value]) => ({ ...value }));

  let uniqueToModalNetworks: any = new Map();
  let uniqueTokensToModalNetworks: any = new Map();

  toModalNetworks.forEach((item: any) => {
    uniqueToModalNetworks.set(item.netId, { ...item });
    uniqueTokensToModalNetworks.set(item.address, { ...item });
  });

  uniqueToModalNetworks = Array.from(uniqueToModalNetworks, ([, value]) => ({ ...value }));

  uniqueTokensToModalNetworks = Array.from(uniqueTokensToModalNetworks, ([, value]) => ({ ...value }));

  const handleClickOnScanLink = (netId: any, address: any) => {
    window.open(
      `${switchMatch(netId, {
        1: "https://etherscan.io/token/",
        4: "https://rinkeby.etherscan.io/token/",
        56: "https://bscscan.com/token/",
        97: "https://testnet.bscscan.com/token/",
      })}${address}`,
      "_blank",
    );
  };

  const renderNetworkItem = (item: any, key: number) => {
    const { name, address, id } = getNetworkById(item.netId);
    const active = type === "from" ? swapForm.from.netId === id : swapForm.to.netId === id;
    return (
      <div
        key={`renderNetworkItem_${key}`}
        className={classNames("SelectToken__columns__network_item", {
          "SelectToken__columns__network_item-active": active,
        })}
        onClick={() => {
          setNavState("TOKEN");
          if (type === "from") {
            batch(() => {
              dispatch(commonActions.setFromNetworkId(id));
              dispatch(commonActions.setFromTokenId(null));
              dispatch(commonActions.setToNetworkId(null));
              dispatch(commonActions.setToTokenId(null));
            });
          } else {
            batch(() => {
              dispatch(commonActions.setToNetworkId(id));
              dispatch(commonActions.setToTokenId(null));
            });
          }
        }}>
        <div className="SelectToken__columns__network_item-icon">
          {(() => {
            const Icon = getIconNetworkById(id);
            return <Icon />;
          })()}
        </div>
        <div className="SelectToken__columns__network_item-name">{name}</div>
        <div>{address}</div>
      </div>
    );
  };

  const renderNetworksForFrom = () => (
    <>{uniqueFromModalNetworks.map((item: any, key: number) => renderNetworkItem(item, key))}</>
  );

  const renderNetworksForTo = () => (
    <>{uniqueToModalNetworks.map((item: any, key: number) => renderNetworkItem(item, key))}</>
  );

  const renderTokensForFrom = () => (
    <>
      {[...uniqueTokensFromModalNetworks]
        .filter((_item) => {
          const { netId, name, symbol } = _item;
          return (
            netId === swapForm.from.netId &&
            (searchToken.length > 0
              ? `${name} ${symbol}`.toLocaleLowerCase().indexOf(searchToken.toLocaleLowerCase()) > -1
              : true)
          );
        })
        .map(({ name, address, id }, key) => (
          <div key={`SelectToken_currency_item_${key}`} className="display_flex">
            <div
              className={classNames("SelectToken_currency_item", {
                SelectToken_currency_item__active: swapForm.from.tokenId === id,
              })}
              onClick={() => {
                batch(() => {
                  dispatch(commonActions.setFromTokenId(id));
                  dispatch(commonActions.setToNetworkId(null));
                  dispatch(commonActions.setToTokenId(null));
                });
                props.close();
              }}>
              <div className="SelectToken_currency_item_title">{name}</div>
              <div className="SelectToken_currency_item_address">{shortenAddress(address)}</div>
            </div>
            <div className="SelectToken_main_icon" onClick={() => handleClickOnScanLink(swapForm[type].netId, address)}>
              <InfoSVG />
            </div>
          </div>
        ))}
    </>
  );

  const renderTokensForTo = () => (
    <>
      {[...uniqueTokensToModalNetworks]
        .filter((_item) => {
          const { netId, name, symbol, payToken } = _item;
          return (
            netId === swapForm.to.netId &&
            payToken.id === swapForm.from.tokenId &&
            (searchToken.length > 0 ? `${name} ${symbol}`.indexOf(searchToken) > -1 : true)
          );
        })
        .map(({ name, address, id }, key) => (
          <div key={`SelectToken_currency_item_${key}`} className="display_flex">
            <div
              className={classNames("SelectToken_currency_item", {
                SelectToken_currency_item__active: swapForm.to.tokenId === id,
              })}
              onClick={() => {
                dispatch(commonActions.setToTokenId(id));
                props.close();
              }}>
              <div className="SelectToken_currency_item_title">{name}</div>
              <div className="SelectToken_currency_item_address">{shortenAddress(address)}</div>
            </div>
            <div className="SelectToken_main_icon" onClick={() => handleClickOnScanLink(swapForm[type].netId, address)}>
              <InfoSVG />
            </div>
          </div>
        ))}
    </>
  );
  const currentNetwork = getNetworkById(swapForm[type].netId) || { name: "Select Token" };
  return (
    <div className="SelectToken_main">
      <div className="SelectToken__head">
        <div
          className="SelectToken__head__back"
          onClick={() => {
            if (navState === "TOKEN") {
              return setNavState("NETWORK");
            }
            return false;
          }}>
          <BackSVG />
        </div>
        <div className="SelectToken__head__text">
          {navState === "NETWORK" ? (
            <>
              Select <span>{type.toUpperCase()}</span> network
            </>
          ) : (
            currentNetwork.name
          )}
        </div>
      </div>

      <div className="SelectToken__columns">
        <div
          className={classNames("SelectToken__columns__network", {
            "SelectToken__columns__active-tab": isMobile() && navState === "NETWORK",
          })}>
          <div className="SelectToken__columns_title">
            Select <span>{type.toUpperCase()}</span> network
          </div>
          <div className="SelectToken__columns__network_list">
            {switchMatch(type, {
              from: renderNetworksForFrom,
              to: renderNetworksForTo,
            })}
          </div>
        </div>
        <div
          className={classNames("SelectToken__columns__token", {
            "SelectToken__columns__active-tab": isMobile() && navState === "TOKEN",
          })}>
          <div className="SelectToken__columns__token__heading">
            <div className="SelectToken__columns_title">Select token</div>
            <div className="SelectToken__columns__token__heading-search">
              <div className="SelectToken__columns__token__heading-search__text">Search</div>
              <Input
                name="amount"
                mode="primary"
                value={searchToken}
                placeholder=""
                disabled={type === "from" ? !swapForm.from.netId : !swapForm.to.netId}
                onChangeHandler={(e) => {
                  setSearchToken(String(e));
                }}
              />
            </div>
          </div>
          {!!swapForm.from.netId && (
            <div className="SelectToken_tokens">
              {switchMatch(type, {
                from: renderTokensForFrom,
                to: renderTokensForTo,
              })}
            </div>
          )}
          {!swapForm.from.netId && <div className="SelectToken_notSelected">← Not selected network id</div>}
        </div>
      </div>
    </div>
  );
};

export default SelectToken;
