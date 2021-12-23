import "./index.scss";
import React from "react";
import { useWeb3React } from "@web3-react/core";
import { useSelector } from "react-redux";
import { Link } from "react-router5";
import Spacer from "../../../components/ui/universal/Spacer";
import Pool from "../../../components/common/Pool";
import Button from "../../../components/ui/universal/Button";
import useGetOffersForExchanger from "../../../hooks/useGetOffersForExchanger";
import router5 from "../../../router";
import { PAGE_ROUTES } from "../../../definitions";
import { Notification } from "../../../components/ui/universal/Notification";
import { ReactComponent as WarningSVG } from "./assets/images/warning.svg";
import { AccentWindowWrapper } from "../../../components/common/AccentWindowWrapper";
import { trimAccount } from "../../../utils";
import { DarkWrapper } from "../../../components/common/DarkWrapper";
import { BlockChainConfig } from "../../../store/reducers/common/model";
import { Offer } from "../../../store/actions/orders-actions/orders-actions.model";

const PoolsPage = () => {
  const { offers } = useGetOffersForExchanger();
  const blockchainConfig = useSelector(
    (state: { common: { blockchainConfig: BlockChainConfig } }) => state.common.blockchainConfig,
  );
  const { account, chainId, active } = useWeb3React();

  const getNetName = (id: number) => {
    if (id in blockchainConfig) {
      return blockchainConfig[id].name;
    }
    return "";
  };

  const tooltipContent = (
    <div>
      <p>
        List pools for the {(chainId && getNetName(chainId)) || ""} network account {trimAccount(account)}. You can
        choose another network or account in Metamask.
      </p>
      <p>
        Don`t worry if you don`t see your newly created pool here, or if it`s information hasn`t changed after editing.
        It will be updated in a few minutes.
      </p>
    </div>
  );

  if (!active) {
    return (
      <AccentWindowWrapper title="My pools">
        <Notification icon={<WarningSVG />}>
          <p>This network is not supported switch network in Metamask</p>
        </Notification>
      </AccentWindowWrapper>
    );
  }

  return (
    <AccentWindowWrapper tooltip={tooltipContent} title={"Pools"}>
      {offers && offers.length > 0 && (
        <>
          <DarkWrapper horizontalPadding={4}>
            {offers.map((offer: Offer, k: number) => (
              <Pool offer={offer} key={`k${k}`} />
            ))}
          </DarkWrapper>
          <Spacer size={12} />
          <Button
            mode={"secondary"}
            rounded
            shadow
            size="large"
            onClick={() => router5.navigate(PAGE_ROUTES.CREATE_POOL)}>
            Create а new pool
          </Button>
        </>
      )}

      {offers && offers.length === 0 && (
        <section className="PoolsPage__empty-block">
          <h4 className="PoolsPage__empty-title">No created pools</h4>
          <p className="PoolsPage__empty-message">
            Go to{" "}
            <Link className="PoolsPage__empty-link" routeName={PAGE_ROUTES.CREATE_POOL}>
              Create pool
            </Link>
            <br />
            or Please wait if u already created
          </p>
        </section>
      )}
    </AccentWindowWrapper>
  );
};

export default PoolsPage;
