import React from "react";
// eslint-disable-next-line import/no-unresolved
import Button from "../../components/ui/universal/Button";
import Loading from "../../components/ui/universal/Loading";

const WaitingResult = (props) => (
  <div>
    <div>
      <div className="SwitchChain">
        <span className="SwitchChain_title">Transaction processing</span>

        <span className="SwitchChain_subtitle">Please wait until the end of the transaction</span>

        <div style={{ marginTop: 16 }}>
          <Button
            onClick={() => {
              props.close();
            }}
            rounded
            fullWidth
            size="hyper"
            beforeContent={
              <div style={{ width: 50, position: "relative", marginTop: -30 }}>
                <Loading />
              </div>
            }
          />
        </div>
      </div>
    </div>
  </div>
);

export default React.memo(WaitingResult);
