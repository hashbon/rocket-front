import "./index.scss";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { isEmptyObject } from "../../../utils";
import { commonActions } from "../../../store/actions";
import { BlockChainConfig } from "../../../store/reducers/common/model";
import LandingHeader from "../../../components/ui/desktop/LandingHeader";

const CrowdsaleWrapper: React.FC = ({ children }) => {
  const dispatch = useDispatch();
  const blockchainConfig = useSelector(
    (state: { common: { blockchainConfig: BlockChainConfig } }) => state.common.blockchainConfig,
  );

  useEffect(() => {
    dispatch(commonActions.getBlockChainConfig());
  }, []);

  if (isEmptyObject(blockchainConfig)) {
    return <div />;
  }

  return (
    <>
      <LandingHeader />
      <div className="CrowdsaleWrapper_page">{children}</div>
    </>
  );
};

export default CrowdsaleWrapper;
