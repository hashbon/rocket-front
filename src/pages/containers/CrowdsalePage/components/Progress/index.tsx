import "./index.scss";
import React, { useMemo, useState } from "react";
import { nFormatter } from "../../../../../utils/nFormatter";
import { ReactComponent as FlagIcon } from "./assets/icons/flag.svg";
import { ReactComponent as CapIcon } from "./assets/icons/cap.svg";

interface IProgress {
  amount: number;
  participants: number;
  target: number;
}
const Progress: React.FC<IProgress> = ({ amount, participants, target }) => {
  const [percent, setPercent] = useState(0);
  const softcapPercent = 50;

  useMemo(() => {
    setPercent(Math.min(100, (100 * amount) / target));
  }, [amount, target]);

  return (
    <div className="CrowdsaleProgress">
      <div className="CrowdsaleProgress_range">
        <div>$0</div>
        <div className="display_flex softcap">
          <span>
            <small>Softcap</small> $500k
          </span>
          <div>
            <CapIcon />
          </div>
        </div>
        <div className="display_flex">
          <div>${nFormatter(target, 1)}</div>
          <div>
            <FlagIcon />
          </div>
        </div>
      </div>
      <div className="CrowdsaleProgress_progress">
        <div className="CrowdsaleProgress_progress-bar softcap" style={{ width: `${softcapPercent}%` }} />
        <div className="CrowdsaleProgress_progress-bar" style={{ width: `${percent - softcapPercent}%` }}>
          <div className="CrowdsaleProgress_progress-bar-amount">${nFormatter(amount, 2)}</div>
          <div className="CrowdsaleProgress_progress-bar-participants">{nFormatter(participants, 2)} participants</div>
        </div>
      </div>
    </div>
  );
};

export default Progress;
