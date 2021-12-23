import "./index.scss";
import React, { useEffect, useState } from "react";
import cogoToast from "cogo-toast";
import { useWeb3React } from "@web3-react/core";
import { isAddress } from "web3-utils";
import { Link } from "react-router5";
import Padding from "../../ui/universal/Padding";
import Spacer from "../../ui/universal/Spacer";
import Input from "../../ui/universal/Input";
import Button from "../../ui/universal/Button";
import useCallMethod from "../../../services/web3network/hooks/web3";
import { toPowAndHex } from "../../../services/web3network/utils";
import useGetNetworks from "../../../hooks/useGetNetworks";
import { MaxBigNumber } from "../../../services/web3network/constants/misc";
import { PAGE_ROUTES } from "../../../definitions";
import router from "../../../router";
import FormLoadingStatus from "../FormLoadingStatus";
import { getErc20Contract, getHashBridgeContract } from "../../../services/web3network/utils/contractHelpers";
import { errorHandler } from "../../../services/web3network/utils/errorHandler";

const ERROR_INCORRECT_ADDRESS = "* Address is incorrect";

interface DataErrors {
  exchangeTokenAddressError: string;
  receiveTokenAddressError: string;
  amountTokenAddressError: string;
  exchangeRateError: string;
  minimumPurchaseError: string;
  receivingPaymentAddressError: string;
}

const CreatePoolForm = () => {
  const [exchangeTokenAddress, setExchangeTokenAddress] = useState<React.ReactText>("");
  const [tokenAddressForContract, setTokenAddressForContract] = useState<React.ReactText>("");
  const [dataErrors, setDataErrors] = useState<DataErrors>({
    exchangeTokenAddressError: "",
    receiveTokenAddressError: "",
    amountTokenAddressError: "",
    exchangeRateError: "",
    minimumPurchaseError: "",
    receivingPaymentAddressError: "",
  });

  const [receivingTokenAddress, setReceivingTokenAddress] = useState("");
  const [receivingTokenDecimals, setReceivingTokenDecimals] = useState("18");
  const [amount, setAmount] = useState("0");
  const [exchangeRate, setExchangeRate] = useState("0");
  const [minimumPurchase, setMinimumPurchase] = useState("0");
  const [isNeedApprove, setNeedApprove] = useState(true);
  const [isLoading, setIsLoading] = useState(false);
  const [isPoolCreated, setIsPoolCreated] = useState(false);

  const { currentNetwork } = useGetNetworks();
  const { data: decimals, execute: executeDecimals, errors: errorsDecimals } = useCallMethod("decimals");
  const { data: allowance, execute: executeAllowance, errors: errorsAllowance } = useCallMethod("allowance");
  const errorSelectedChainId = errorsAllowance.errorSelectedChainId || errorsDecimals.errorSelectedChainId;

  const { account, chainId, library } = useWeb3React();
  const [receivingPaymentAddress, setReceivingPaymentAddress] = useState(`${account}`);

  // Smart Contracts
  const tokenContract = currentNetwork
    ? getErc20Contract(String(tokenAddressForContract), chainId, library.getSigner())
    : null;
  const bridgeContract = currentNetwork
    ? getHashBridgeContract(currentNetwork.contractAddress, chainId, library.getSigner())
    : null;

  const checkFields = () => {
    if (tokenContract) {
      if (executeDecimals) executeDecimals(tokenContract);

      if (executeAllowance) {
        executeAllowance(tokenContract, [account, currentNetwork?.contractAddress]);
      }
    }
  };

  useEffect(() => {
    // Get Token Decimals and Allowance
    checkFields();
    // TODO: Добавлять в зависимость checkFields можно только с useCallback, сейчас экспериментировавть опасно
  }, [tokenAddressForContract, chainId]);

  useEffect(() => {
    setNeedApprove(
      !(
        allowance &&
        decimals &&
        amount !== "0" &&
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-ignore
        // eslint-disable-next-line
        amount * Math.pow(10, Number(decimals)) < Number(allowance.toString())
      ),
    );
  }, [amount, allowance, decimals, tokenAddressForContract, exchangeTokenAddress]);

  useEffect(() => {
    if (isPoolCreated) {
      setTimeout(() => {
        router.navigate(PAGE_ROUTES.POOLS);
      }, 2000);
    }
  }, [isPoolCreated]);

  const approveHandler = () => {
    if (tokenContract && isNeedApprove) {
      setIsLoading(true);
      tokenContract
        ?.approve(currentNetwork?.contractAddress, MaxBigNumber, { from: account })
        .then((result: any) => result.wait())
        .then(() => setNeedApprove(false))
        .catch((err: any) => errorHandler(err))
        .finally(() => setIsLoading(false));
    }
  };

  const addOfferHandler = () => {
    if (bridgeContract && decimals) {
      setIsPoolCreated(false);
      setIsLoading(true);
      bridgeContract
        ?.addOffer(
          exchangeTokenAddress,
          toPowAndHex(amount, decimals),
          receivingTokenAddress,
          toPowAndHex(exchangeRate, 18 + Number(receivingTokenDecimals) - Number(decimals)),
          receivingPaymentAddress,
          toPowAndHex(minimumPurchase, decimals),
          { from: account },
        )
        .then((result: any) => result.wait())
        .then(() => {
          cogoToast.success("Pool created");
          setIsPoolCreated(true);
        })
        .catch(() => {})
        .finally(() => setIsLoading(false));
    }
  };

  let validated = true;
  Object.keys(dataErrors).forEach((dataErrorsKey) => {
    if (dataErrors[dataErrorsKey as keyof DataErrors].length > 0) {
      validated = false;
    }
  });

  if (
    (typeof exchangeTokenAddress === "string" && !exchangeTokenAddress.length) ||
    !receivingPaymentAddress.length ||
    !minimumPurchase.length ||
    !exchangeRate.length ||
    !amount.length ||
    amount === "0" ||
    !receivingTokenAddress.length
  ) {
    validated = false;
  }

  const renderForm = () => (
    <div>
      <Padding>
        <div className="w-100">
          <Input
            name="exchangeTokenAddress"
            mode="primary"
            title="Exchange Token Contract Address"
            placeholder="0x0000000000000000000000000000000000000000"
            value={String(exchangeTokenAddress)}
            onChangeHandler={(value) => {
              setExchangeTokenAddress(value);
              if (!isAddress(String(value))) {
                setDataErrors({
                  ...dataErrors,
                  exchangeTokenAddressError: ERROR_INCORRECT_ADDRESS,
                });
                return;
              }

              setDataErrors({
                ...dataErrors,
                exchangeTokenAddressError: "",
              });

              setTokenAddressForContract(value);
            }}
            error={!!dataErrors.exchangeTokenAddressError.length || errorSelectedChainId}
            description={
              // eslint-disable-next-line no-nested-ternary
              dataErrors.exchangeTokenAddressError.length ? (
                <div>{dataErrors.exchangeTokenAddressError}</div>
              ) : errorSelectedChainId ? (
                <div>Please Switch network to token network</div>
              ) : (
                <></>
              )
            }
          />

          <Spacer size={6} />

          <Input
            name="receivingTokenAddress"
            mode="primary"
            title="Receiving Token Contract Address"
            placeholder="0x0000000000000000000000000000000000000000"
            value={receivingTokenAddress || ""}
            onChangeHandler={(value) => {
              setReceivingTokenAddress(String(value));

              if (!isAddress(String(value))) {
                setDataErrors({
                  ...dataErrors,
                  receiveTokenAddressError: ERROR_INCORRECT_ADDRESS,
                });
                return;
              }

              setDataErrors({
                ...dataErrors,
                receiveTokenAddressError: "",
              });
            }}
            error={!!dataErrors.receiveTokenAddressError.length}
            description={
              !!dataErrors.receiveTokenAddressError.length && <div>{dataErrors.receiveTokenAddressError}</div>
            }
          />

          <Spacer size={6} />

          <Input
            name="receivingTokenDecimals"
            mode="primary"
            title="Receiving Token Decimals"
            placeholder="0"
            value={`${receivingTokenDecimals}`}
            onChangeHandler={(e) => {
              if (!e.toString().match(/^\d{0,3}$/)) {
                return false;
              }
              return setReceivingTokenDecimals(e.toString());
            }}
          />

          <Spacer size={6} />

          <Input
            name="amount"
            mode="primary"
            title="Amount"
            placeholder="0.0"
            value={`${amount}`}
            onChangeHandler={(e) => {
              if (!e.toString().match(/^\d{0,15}(\.\d{0,15}){0,1}$/)) {
                return false;
              }
              return setAmount(e.toString());
            }}
          />

          <Spacer size={6} />

          <Input
            name="exchangeRate"
            mode="primary"
            title="Enter Exchange Rate"
            placeholder="1.1"
            value={`${exchangeRate}`}
            onChangeHandler={(e) => {
              if (!e.toString().match(/^\d{0,15}(\.\d{0,15}){0,1}$/)) {
                return false;
              }
              return setExchangeRate(e.toString());
            }}
          />

          <Spacer size={6} />

          <Input
            name="receivingPaymentAddress"
            mode="primary"
            title="Receiving Payment Wallet Address"
            placeholder="0x0000000000000000000000000000000000000000"
            value={receivingPaymentAddress !== "undefined" ? receivingPaymentAddress : ""}
            onChangeHandler={(value) => {
              setReceivingPaymentAddress(String(value));

              if (!isAddress(String(value))) {
                setDataErrors({
                  ...dataErrors,
                  receivingPaymentAddressError: ERROR_INCORRECT_ADDRESS,
                });
                return;
              }

              setDataErrors({
                ...dataErrors,
                receivingPaymentAddressError: "",
              });
            }}
            error={!!dataErrors.receivingPaymentAddressError.length}
            description={
              !!dataErrors.receivingPaymentAddressError.length && <div>{dataErrors.receivingPaymentAddressError}</div>
            }
          />

          <Spacer size={6} />

          <Input
            name="minimumPurchase"
            mode="primary"
            title="Minimum Purchase"
            placeholder="0.0"
            value={`${minimumPurchase}`}
            onChangeHandler={(e) => {
              if (!e.toString().match(/^\d{0,15}(\.\d{0,15}){0,1}$/)) {
                return false;
              }
              return setMinimumPurchase(e.toString());
            }}
          />
        </div>

        <Spacer size={6} direction="vertical" />
        <div className="CreatePoolForm__footer">
          <FormLoadingStatus
            isLoading={isLoading}
            isDone={isPoolCreated}
            renderDoneText={() => (
              <>
                Your pool has been successfully created! Please go to the{" "}
                <Link routeName={PAGE_ROUTES.POOLS}>Pool page</Link> to see it.
              </>
            )}
          />

          <div className="CreatePoolForm__footer__button">
            {isNeedApprove ? (
              <Button rounded size="pre_hyper" mode="white" disabled={isLoading || !validated} onClick={approveHandler}>
                {isLoading ? "Loading..." : "Approve"}
              </Button>
            ) : (
              <Button
                rounded
                size="pre_hyper"
                mode="white"
                disabled={isLoading || !validated}
                onClick={addOfferHandler}>
                {isLoading ? "Loading..." : "Submit"}
              </Button>
            )}
          </div>
        </div>
      </Padding>
    </div>
  );

  const renderMain = () => (
    <div>
      <Spacer size={4} />
      {renderForm()}
      <Spacer size={4} />
    </div>
  );

  return (
    <div>
      {renderMain()}
      <Spacer size={6} />
    </div>
  );
};

export default CreatePoolForm;
