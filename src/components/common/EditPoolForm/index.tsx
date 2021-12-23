import "./index.scss";
import React, { useEffect, useState } from "react";
import { Link } from "react-router5";
import cogoToast from "cogo-toast";
import { useWeb3React } from "@web3-react/core";
import { isAddress } from "web3-utils";
import Spacer from "../../ui/universal/Spacer";
import Input from "../../ui/universal/Input";
import Button from "../../ui/universal/Button";
import useCallMethod from "../../../services/web3network/hooks/web3";
import { toPowAndHex } from "../../../services/web3network/utils";
import useGetNetworks from "../../../hooks/useGetNetworks";
import { MaxBigNumber } from "../../../services/web3network/constants/misc";
import router from "../../../router";
import useGetOffersForExchanger from "../../../hooks/useGetOffersForExchanger";
import { PAGE_ROUTES } from "../../../definitions";
import { Offer } from "../../../store/actions/orders-actions/orders-actions.model";
import FormLoadingStatus from "../FormLoadingStatus";
import { getErc20Contract, getHashBridgeContract } from "../../../services/web3network/utils/contractHelpers";
import { errorHandler } from "../../../services/web3network/utils/errorHandler";

interface DataErrors {
  amountTokenAddressError: string;
  exchangeRateError: string;
  minimumPurchaseError: string;
  receivingPaymentAddressError: string;
  tokenAddressForContract: string;
}

const EditPoolForm = () => {
  const { getOfferById } = useGetOffersForExchanger();
  const { params: routerParams } = router.getState();

  const [dataErrors, setDataErrors] = useState<DataErrors>({
    amountTokenAddressError: "",
    exchangeRateError: "",
    minimumPurchaseError: "",
    receivingPaymentAddressError: "",
    tokenAddressForContract: "",
  });

  const initialEditFormState = {
    amount: "0",
    exchangeRate: "0",
    receivingPaymentAddress: "",
    minimumPurchase: "0",
    tokenAddressForContract: "",
    receivingTokenDecimals: 0,
  };

  let thatOffer: Offer | undefined;
  // eslint-disable-next-line no-prototype-builtins
  if (routerParams?.hasOwnProperty("id")) {
    thatOffer = getOfferById(Number(routerParams.id));
    // eslint-disable-next-line no-prototype-builtins
    if (thatOffer?.hasOwnProperty("amount")) {
      initialEditFormState.amount = thatOffer.amount.toString();
      initialEditFormState.exchangeRate = thatOffer.rate.toString();
      initialEditFormState.receivingPaymentAddress = thatOffer.payAddress;
      initialEditFormState.minimumPurchase = thatOffer.minPurchase.toString();
      initialEditFormState.tokenAddressForContract = thatOffer.token.address;
      initialEditFormState.receivingTokenDecimals = thatOffer.payToken.decimals;
    }
  }

  const { account, chainId, library } = useWeb3React();

  const [amount, setAmount] = useState(initialEditFormState.amount || "0");
  const [exchangeRate, setExchangeRate] = useState(initialEditFormState.exchangeRate || "0");
  const [minimumPurchase, setMinimumPurchase] = useState(initialEditFormState.minimumPurchase || "0");
  const [isNeedApprove, setNeedApprove] = useState(true);
  const [isLoading, setIsLoading] = useState(false);
  const [isPoolUpdated, setIsPoolUpdated] = useState(false);
  const [isPoolLoaded, setIsPoolLoaded] = useState(false);

  const { currentNetwork } = useGetNetworks();

  const { data: decimals, execute: executeDecimals } = useCallMethod("decimals");
  const { data: allowance, execute: executeAllowance } = useCallMethod("allowance");

  const [tokenAddressForContract, setTokenAddressForContract] = useState(
    initialEditFormState.tokenAddressForContract || "",
  );

  const [receivingPaymentAddress, setReceivingPaymentAddress] = useState(
    initialEditFormState.receivingPaymentAddress || `${account}`,
  );

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
    // eslint-disable-next-line no-prototype-builtins,@typescript-eslint/no-use-before-define
    if (!isPoolLoaded && thatOffer?.hasOwnProperty("amount")) {
      setAmount(thatOffer.amount.toString());
      setExchangeRate(thatOffer.rate.toString());
      setMinimumPurchase(thatOffer.minPurchase.toString());
      setReceivingPaymentAddress(thatOffer.payAddress || `${account}`);
      setTokenAddressForContract(thatOffer.token.address);
      setIsPoolLoaded(true);
    }
  }, [account, isPoolLoaded, thatOffer]);

  useEffect(() => {
    // Get Token Decimals and Allowance
    checkFields();
  }, [tokenAddressForContract, chainId]);

  useEffect(() => {
    if (isPoolUpdated) {
      setTimeout(() => {
        router.navigate(PAGE_ROUTES.POOLS);
      }, 2000);
    }
  }, [isPoolUpdated]);

  useEffect(() => {
    setNeedApprove(
      !(
        allowance &&
        decimals &&
        amount !== "0" &&
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-ignore
        // eslint-disable-next-line no-restricted-properties
        amount * Math.pow(10, Number(decimals)) < Number(allowance.toString())
      ),
    );
  }, [amount, allowance, decimals, tokenAddressForContract]);

  // eslint-disable-next-line no-prototype-builtins
  if (!routerParams.hasOwnProperty("id") || typeof thatOffer !== "object") {
    return <div style={{ color: "white", fontSize: 50 }}>Pool id is required GET params</div>;
  }

  const approveHandler = () => {
    if (tokenContract && isNeedApprove) {
      setIsLoading(true);
      tokenContract
        ?.approve(currentNetwork?.contractAddress, MaxBigNumber, { from: account })
        .then((result: any) => result.wait())
        .then(() => setNeedApprove(false))
        .catch((err: Error) => {
          errorHandler(err);
        })
        .finally(() => setIsLoading(false));
    }
  };

  const editOfferHandler = () => {
    if (bridgeContract && decimals) {
      setIsPoolUpdated(false);
      setIsLoading(true);

      bridgeContract
        .updateOffer(
          thatOffer?.idInContract,
          toPowAndHex(amount, decimals),
          toPowAndHex(exchangeRate, 18 + Number(initialEditFormState.receivingTokenDecimals) - Number(decimals)),
          receivingPaymentAddress,
          toPowAndHex(minimumPurchase, decimals),
          { from: account },
        )
        .then((result: any) => result.wait())
        .then(() => {
          cogoToast.success("Pool updated");
          setIsPoolUpdated(true);
        })
        .catch((err: Error) => {
          errorHandler(err);
        })
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
    !receivingPaymentAddress.length ||
    !minimumPurchase.toString().length ||
    !exchangeRate.toString().length ||
    !amount.toString().length ||
    amount === "0"
  ) {
    validated = false;
  }

  const renderForm = () => (
    <div>
      <div className="w-100">
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
            setAmount(e.toString());
            return true;
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
            setExchangeRate(e.toString());
            return true;
          }}
        />

        <Spacer size={6} />

        <Input
          name="receivingPaymentAddress"
          mode="primary"
          title="Receiving Payment Wallet Address"
          placeholder="0x0000000000000000000000000000000000000000"
          value={receivingPaymentAddress}
          onChangeHandler={(value) => {
            setReceivingPaymentAddress(String(value));

            if (!isAddress(String(value))) {
              setDataErrors({
                ...dataErrors,
                receivingPaymentAddressError: "Address is incorrect",
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
            !!dataErrors.receivingPaymentAddressError.length && <div>*{dataErrors.receivingPaymentAddressError}</div>
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
            setMinimumPurchase(e.toString());
            return true;
          }}
        />
      </div>

      <Spacer size={6} direction="vertical" />

      <div className="EditPoolForm__footer">
        <FormLoadingStatus
          isLoading={isLoading}
          isDone={isPoolUpdated}
          renderDoneText={() => (
            <>
              Your pool is successfully updated! You may return to the{" "}
              <Link routeName={PAGE_ROUTES.POOLS}>Pool page</Link> to see it.
            </>
          )}
        />
        <div className="EditPoolForm__footer__button">
          {isNeedApprove ? (
            <Button rounded size="pre_hyper" mode="white" disabled={isLoading || !validated} onClick={approveHandler}>
              {isLoading ? "Loading..." : "Approve"}
            </Button>
          ) : (
            <Button rounded size="pre_hyper" mode="white" disabled={isLoading || !validated} onClick={editOfferHandler}>
              {isLoading ? "Loading..." : "Submit"}
            </Button>
          )}
        </div>
      </div>
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

export default EditPoolForm;
