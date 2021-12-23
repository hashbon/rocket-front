import "./index.scss";
import React from "react";
import { useSelector } from "react-redux";
import { v4 as uuidv4 } from "uuid";
import useGetNetworks from "../../../../../hooks/useGetNetworks";
import classNames from "../../../../../utils/classNames";
import { switchMatch } from "../../../../../utils";
import Spacer from "../../../../../components/ui/universal/Spacer";
import { useMobileDetect } from "../../../../../hooks/useMobileDetect";

export interface Stage {
  active: boolean;
  amount: number;
  netId: number;
  finished: boolean;
  stage: number;
  tokenPrice: number;
  paymentsTotal: number;
  participants: [];
  allNetId: number[];
}

const Stages = () => {
  const { isAdaptive } = useMobileDetect();
  const { getNetworkById } = useGetNetworks();
  const { stage } = useSelector((state: { crowdsale: { stages: Stage[] } }) => ({
    stage: state.crowdsale.stages,
  }));

  if (!stage.length) return <div />;

  const activeStages = stage.filter((item) => item.active);
  const activeStage = activeStages[0].stage;

  /*
  activeStages.forEach((item) => {
    if (activeStage < item.stage) {
      activeStages = item.stage;
    }
  });
  */

  const renderStageRow = (item: Stage, item2: Stage) => {
    const { amount, finished, netId } = item;
    const { stage: stageNumber } = item;

    const stageNames = switchMatch(String(stageNumber), {
      1: "Pre-sale",
      2: "Crowdsale Stage 1",
      3: "Crowdsale Stage 2",
      4: "Crowdsale Stage 3",
      5: "Crowdsale Stage 4",
    });

    const { netId: netId2 } = item2;

    const active = item.stage === activeStage;
    const completed = item.stage < activeStage || finished;

    const planned = !completed && !active;

    const network1 = getNetworkById(netId);
    const network2 = getNetworkById(netId2);
    const name1 = network1[network1.currencySymbol.length ? "currencySymbol" : "name"];
    const name2 = network2[network2.currencySymbol.length ? "currencySymbol" : "name"];

    if (isAdaptive) {
      return (
        <div
          className={`CrowdsaleStages_table_row${stageNumber === 1 ? " CrowdsaleStages_table_row_presale" : ""}`}
          key={uuidv4()}>
          <div className="display_flex w-100">
            <div style={{ margin: "0 auto 0 0" }}>{stageNames}</div>
            <div style={{ margin: "0 0 0 auto" }}>
              <div
                className={classNames("CrowdsaleStages_table_col CrowdsaleStages_table_col-status", {
                  progress: active,
                  completed,
                })}>
                {/* eslint-disable-next-line no-nested-ternary */}
                {completed ? "Completed" : active ? "IN PROGRESS" : "PLANNED"}
              </div>
            </div>
          </div>

          <Spacer size={3} />

          <div>
            <strong>{Number(amount).toLocaleString()}</strong>
          </div>
          <Spacer size={3} />
          <div className="w-100 display_flex">
            <div style={{ margin: "0 5px 0 0" }}>
              <div style={{ marginBottom: "10px" }}>
                <strong style={{ color: "#B9B9B9" }}>Price</strong>
              </div>
              <div>
                {Math.round(1 / item.tokenPrice).toLocaleString()} Tokens per 1 {name1} <br />
              </div>
              <div>
                {Math.round(1 / item2.tokenPrice).toLocaleString()} Tokens per 1 {name2} <br />
              </div>
            </div>

            {!planned && stageNumber !== 1 && (
              <div style={{ margin: "0 0 0 auto" }}>
                <div style={{ marginBottom: "10px" }}>
                  <strong style={{ color: "#B9B9B9" }}>Status</strong>
                </div>
                <div>
                  {item.paymentsTotal} {name1} from {item.participants} ppl
                </div>
                <div>
                  {item2.paymentsTotal} {name2} from {item2.participants} ppl
                </div>
              </div>
            )}
          </div>
        </div>
      );
    }

    return (
      <div
        className={`CrowdsaleStages_table_row${stageNumber === 1 ? " CrowdsaleStages_table_row_presale" : ""}`}
        key={uuidv4()}>
        <div className="CrowdsaleStages_table_col">{stageNames}</div>

        <div className="CrowdsaleStages_table_col">{Number(amount).toLocaleString()}</div>

        <div className="CrowdsaleStages_table_col">
          {Math.round(1 / item.tokenPrice).toLocaleString()} Tokens per 1 {name1} <br />
          {Math.round(1 / item2.tokenPrice).toLocaleString()} Tokens per 1 {name2}
        </div>

        <div className="CrowdsaleStages_table_col">
          {!planned && stageNumber !== 1 && (
            <div>
              {item.paymentsTotal} {name1} from {item.participants} ppl <br />
              {item2.paymentsTotal} {name2} from {item2.participants} ppl
            </div>
          )}
        </div>

        <div
          className={classNames("CrowdsaleStages_table_col CrowdsaleStages_table_col-status", {
            progress: active,
            completed,
          })}>
          {/* eslint-disable-next-line no-nested-ternary */}
          {completed ? "Completed" : active ? "IN PROGRESS" : "PLANNED"}
        </div>
      </div>
    );
  };

  const allNetId: number[] = [];
  stage.forEach(({ netId }) => {
    if (!allNetId.includes(netId)) allNetId.push(netId);
  });

  const stagePrimary = stage.filter(({ netId }) => netId === allNetId[0]).sort((a, b) => a.stage - b.stage);
  const totalPrimary = stage.reduce((total, i) => total + i.amount, 0);

  return (
    <div className="CrowdsaleStages">
      <div className="CrowdsaleStages_table">
        <div className="CrowdsaleStages_table_row head">
          <div className="CrowdsaleStages_table_col">Stage</div>
          <div className="CrowdsaleStages_table_col">Amount</div>
          <div className="CrowdsaleStages_table_col">Price</div>
          <div className="CrowdsaleStages_table_col">Status</div>
          <div className="CrowdsaleStages_table_col">Stage status</div>
        </div>

        {stagePrimary.map((item) => {
          const secondNet = stage.filter((el) => el.stage === item.stage && el.netId !== allNetId[0]);
          return renderStageRow(item, secondNet[0]);
        })}
        <div className="w-100 display_flex CrowdsaleStages_total">
          {!isAdaptive ? (
            [
              <div className="CrowdsaleStages_table_col" key={uuidv4()}>
                Total
              </div>,
              <div className="CrowdsaleStages_table_col" key={uuidv4()}>
                {(totalPrimary / 2).toLocaleString()}
              </div>,
            ]
          ) : (
            <div>
              <div>Total: {(totalPrimary / 2).toLocaleString()}</div>
            </div>
          )}
          {!isAdaptive && <div className="CrowdsaleStages_table_col" />}
          {!isAdaptive && <div className="CrowdsaleStages_table_col" />}
          {!isAdaptive && <div className="CrowdsaleStages_table_col" />}
        </div>
      </div>
    </div>
  );
};

export default Stages;
