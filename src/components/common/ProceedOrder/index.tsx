import "./index.scss";
import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { useWeb3React } from "@web3-react/core";
import { Link } from "react-router5";
import { useTimer } from "react-timer-hook";
import Button from "../../ui/universal/Button";
import { MaxBigNumber } from "../../../services/web3network/constants/misc";
import { checkChain } from "../../../utils/checkChain";
import { PAGE_ROUTES } from "../../../definitions";
import TokenCard from "../TokenCard";
import { getIconNetworkById } from "../../../utils";
import { BlockChainConfig } from "../../../store/reducers/common/model";
import { Order } from "../../../store/actions/orders-actions/orders-actions.model";
import { getErc20Contract, getHashBridgeContract } from "../../../services/web3network/utils/contractHelpers";
import { errorHandler } from "../../../services/web3network/utils/errorHandler";

type Props = Order;

const ProceedOrder = (props: Props) => {
  const nets = useSelector((state: { common: { blockchainConfig: BlockChainConfig } }) => state.common.blockchainConfig);

  const { active, account, chainId, library } = useWeb3React();

  const [paid, setPaid] = useState(
    !!props.payments?.length ||
    localStorage.getItem(`order${  props.id}`),
  );
  const [loading, setLoading] = useState(false);
  const [transaction, setTransaction] = useState(false);
  const [expired, setExpired] = useState(false);
  const [approved, setApproved] = useState(false);
  const [decimals, setDecimals] = useState(0);
  const [allowance, setAllowance] = useState(0);

  const { seconds, minutes, hours } = useTimer({
    expiryTimestamp: new Date(props.reservedUntil * 1000),
    onExpire: () => {
      setExpired(true);
    },
  });

  const callDecimals = () => {
    const tokenContract = getErc20Contract(props.offer.payToken.address, chainId, library.getSigner());

    if (tokenContract) {
      tokenContract.decimals({ from: account })
        .then((result: string ) => {
          setDecimals(Number(result));
        });
    }
  };

  const callAllowance = () => {
    const tokenContract = getErc20Contract(props.offer.payToken.address, chainId, library.getSigner());
    if (tokenContract) {
      const net = nets[props.offer.payToken.netId];
      const bridgeContractAddress = net.contractAddress;
      tokenContract.allowance(account, bridgeContractAddress, { from: account })
        .then((result: string) => {
          setAllowance(Number(result));
        });
    }
  };

  useEffect(() => {
    if (active && chainId === props.offer.payToken.netId) {
      callDecimals();
    } else {
      setDecimals(0);
    }
  }, [chainId]);

  useEffect(() => {
    if (active && chainId === props.offer.payToken.netId) {
      callAllowance();
    } else {
      setAllowance(0);
    }
  }, [chainId, account]);

  useEffect(() => {
    if (
      !active ||
      chainId !== props.offer.payToken.netId ||
      decimals === 0 ||
      allowance === 0 ||
      props.payAmount * 10 ** decimals > allowance
    ) {
      setApproved(false);
    } else {
      setApproved(true);
    }
  }, [decimals, allowance]);

  const onChangeChain = () => {
    checkChain(chainId, props.offer.payToken.netId, nets[props.offer.payToken.netId], () => {});
  };

  const onApprove = () => {
    if (approved) {
      return;
    }

    const tokenContract = getErc20Contract(props.offer.payToken.address, chainId, library.getSigner());

    const bridgeContractAddress = nets[props.offer.payToken.netId].contractAddress;

    if (tokenContract) {
      setLoading(true);
      tokenContract.approve(bridgeContractAddress, MaxBigNumber, { from: account })
        .then((result: any) => {
          if (result.hash) {
            setTransaction(true);

          }
          return result.wait();
        })
        .then(() => {
          setAllowance(Number(MaxBigNumber));
        })
        .catch((error: any) => {
          errorHandler(error);
        })
        .finally(() => {
          setTransaction(false);
          setLoading(false);
        });
    }
  };

  const onPay = () => {
    if (!approved || paid) {
      return;
    }

    const bridgeContractAddress = nets[props.offer.payToken.netId].contractAddress;
    const bridgeContract = getHashBridgeContract(bridgeContractAddress, props.offer.payToken.netId, library.getSigner());
    if (bridgeContract) {
      setLoading(true);

      bridgeContract
        .payOrder(props.idInContract, props.payAmount16, props.offer.payToken.address, props.payAddress, { from: account })
        .then((result: any) => {
          if (result.hash) {
            setTransaction(true);
          }

          result.wait()
            .then((receipt: any) => {
              localStorage.setItem(`order${props.id}`, "paid");
              setPaid(true);
              return receipt;
            })
            .catch((error: Error) => {
              errorHandler(error);
            });
        })
        .catch((error: any) => {
          errorHandler(error);
        })
        .finally(() => {
          setTransaction(false);
          setLoading(false);
        });
    }
  };

  const renderPayButton = () => {
    if (chainId !== props.offer.payToken.netId) {
      return (
        <Button mode="outline_white" onClick={onChangeChain}>
          Change chain
        </Button>
      );
    }
    if (approved) {
      return (
        <div style={{ display: "flex", alignItems: "center" }}>
          <Button mode="outline_white" disabled={loading} state={transaction ? "loading" : ""} onClick={onPay}>
            Pay
          </Button>
          {transaction && (
            <div style={{ paddingLeft: "10px", color: "#ccc", fontSize: "12px" }}>Contract Interaction...</div>
          )}
        </div>
      );
    }
    return (
      <div style={{ display: "flex", alignItems: "center" }}>
        <Button mode="outline_white" disabled={loading} state={transaction ? "loading" : ""} onClick={onApprove}>
          Approve
        </Button>
        {transaction && (
          <div style={{ paddingLeft: "10px", color: "#ccc", fontSize: "12px" }}>Contract Interaction...</div>
        )}
      </div>
    );
  };

  return (
    <div className="ProceedOrder">
      <div className="ProceedOrder_columns">
        <div className="ProceedOrder_column ProceedOrder_column--amount">
          <TokenCard
            title={"You will receive"}
            name={`${props.offer.token.name} (${nets[props.offer.token.netId].name})`}
            value={String(props.amount)}
            address={props.offer.token.address}
            image={(() => {
              const Icon = getIconNetworkById(props.offer.token.netId);
              return <Icon />;
            })()}
          />
        </div>
        <div className="ProceedOrder_column ProceedOrder_column--price">
          <TokenCard
            title={"You will pay"}
            name={`${props.offer.payToken.name} (${nets[props.offer.payToken.netId].name})`}
            value={String(props.payAmount)}
            address={props.offer.payToken.address}
            image={(() => {
              const Icon = getIconNetworkById(props.offer.payToken.netId);
              return <Icon />;
            })()}
          />
        </div>
        <div className="ProceedOrder_column ProceedOrder_column--receiving">
          <div className="ProceedOrder_column_title">Tokens receiving address</div>
          <div className="ProceedOrder_column_context">{props.withdrawAddress}</div>
        </div>
        <div className="ProceedOrder_column ProceedOrder_column--timer">
          {!paid && <div className="ProceedOrder_column_title">Time left</div>}
          <div className="ProceedOrder_column_context">
            {/* eslint-disable-next-line no-nested-ternary */}
            <strong>{paid ? "Successfully paid" : expired ? "Expired" : `${hours}:${minutes}:${seconds}`}</strong>
          </div>
          {paid && (
            <div className="ProceedOrder_SuccessMessage">
              Please move back to the <Link routeName={PAGE_ROUTES.ORDERS}>Orders page</Link> to withdraw your purchased
              tokens and don`t forget to switch your Metamask back to {nets[props.offer.netId].name}.
            </div>
          )}
        </div>
      </div>
      {!paid && !expired && renderPayButton()}
    </div>
  );
};

export default React.memo(ProceedOrder);
