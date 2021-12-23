import "./index.scss";
import { useWeb3React } from "@web3-react/core";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { userActions } from "../../../../../store/actions";
import Button from "../../../../../components/ui/universal/Button";
import { nFormatter } from "../../../../../utils/nFormatter";
import { ReactComponent as EthLogo } from "../../../../../static/images/svg/ethereum.svg";
import { ReactComponent as BscLogo } from "../../../../../static/images/svg/binance.svg";
import { shortenAddress } from "../../../../../services/web3network/utils";
import useGetNetworks from "../../../../../hooks/useGetNetworks";
import ConnectToWalletButton from "../../../../../components/common/ConnectToWalletButton";
import classNames from "../../../../../utils/classNames";
import { checkChain } from "../../../../../utils/checkChain";
import { getHashSaleContract } from "../../../../../services/web3network/utils/contractHelpers";
import { errorHandler } from "../../../../../services/web3network/utils/errorHandler";

const ClaimTokens = () => {
  const dispatch = useDispatch();
  const { tokensToWithdraw, user, withdrawals } = useSelector((state: any) => state.user);
  const [loaded, setLoaded] = useState(false);
  const [iteration, setIteration] = useState(false);
  const { active, account, chainId, library } = useWeb3React();
  const { currentNetwork, getNetworkById } = useGetNetworks();
  const saleContract = currentNetwork ? getHashSaleContract(currentNetwork.saleContractAddress, chainId, library.getSigner()) : null;

  const isEth = !!(chainId && [1, 4].includes(chainId));
  const isBsc = !!(chainId && [56, 97].includes(chainId));
  const ethChainId = getNetworkById(1).name ? 1 : 4;
  const bscChainId = getNetworkById(56).name ? 56 : 97;

  const [isEthDone, setIsEthDone] = useState(false);
  const [isBscDone, setIsBscDone] = useState(false);

  const checkAddressExists = (address: string) =>
    user.investorAddresses.find((obj: any) => obj.address.toLowerCase() === address.toLowerCase());

  useEffect(() => {
    if (account && checkAddressExists(account)) {
      dispatch(userActions.getSalesForCustomer(account));
      setLoaded(true);
    }
  }, [account, user]);

  useEffect(() => {
    const b = withdrawals.find((i: any) => i.netId === bscChainId);
    const e = withdrawals.find((i: any) => i.netId === ethChainId);
    setIsBscDone(!!b);
    setIsEthDone(!!e);
  }, [tokensToWithdraw]);

  const claimTokens = (type: any) => {
    const needed = type === "eth" ? ethChainId : bscChainId;
    checkChain(chainId, needed, getNetworkById(needed), () => {
      if (saleContract && account) {
        const address = checkAddressExists(account);

        if (!address || !address.signature) {
          return;
        }

        setIteration(true);

        saleContract
          .withdrawTokens(address.signature, { from: account })
          .then((result: any) => {
            result.wait()
              .then(() => {
                if (isBsc) {
                  setIsBscDone(true);
                } else {
                  setIsEthDone(true);
                }
              });
          })
          .catch((error: any) => errorHandler(error))
          .finally(() => {
            setIteration(false);
          });
      }
    });
  };
  const address = account ? checkAddressExists(account) : null;
  const sign = address ? address.signature : null;

  return (
    <div className="ClaimTokens">
      {!active && <div className="ClaimTokens__description">You need to connect your wallet.</div>}
      {active && sign && (
        <div className="ClaimTokens__description">Switch to the needed network and take your HASH Tokens.</div>
      )}

      {active && !sign && <div className="ClaimTokens__description">Please wait while we sign the address</div>}

      {active && account ? (
        <div className="ClaimTokens__address">{shortenAddress(account, 10)}</div>
      ) : (
        <ConnectToWalletButton type="landing" />
      )}

      {loaded && sign && (
        <div className="ClaimTokens__buttons">
          <div>
            <Button
              onClick={() => claimTokens("bsc")}
              className={classNames("ClaimTokens__button ClaimTokens__button--bnb", {
                "ClaimTokens__button--bnb--outline": !isBsc && !isBscDone && tokensToWithdraw[bscChainId] > 0,
              })}
              disabled={iteration || isBscDone || tokensToWithdraw[bscChainId] === 0}>
              <div className="ClaimTokens__button--label">
                <BscLogo className="ClaimTokens__button--icon" />
                {isBscDone ? <div>DONE!</div> : <div>Claim {nFormatter(tokensToWithdraw[bscChainId], 2)} HASH</div>}
              </div>
            </Button>
            {!isBsc && !isBscDone && tokensToWithdraw[bscChainId] > 0 && (
              <div className="ClaimTokens__done">Switch network</div>
            )}
          </div>
          <div>
            <Button
              onClick={() => claimTokens("eth")}
              className={classNames("ClaimTokens__button ClaimTokens__button--eth", {
                "ClaimTokens__button--eth--outline": !isEth && !isEthDone && tokensToWithdraw[ethChainId] > 0,
              })}
              disabled={iteration || isEthDone || tokensToWithdraw[ethChainId] === 0}>
              <div className="ClaimTokens__button--label">
                <EthLogo className="ClaimTokens__button--icon" />
                {isEthDone ? <div>DONE!</div> : <div>Claim {nFormatter(tokensToWithdraw[ethChainId], 2)} HASH</div>}
              </div>
            </Button>
            {!isEth && !isEthDone && tokensToWithdraw[ethChainId] > 0 && (
              <div className="ClaimTokens__done">Switch network</div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default ClaimTokens;
