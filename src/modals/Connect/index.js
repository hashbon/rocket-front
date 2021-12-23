import React from "react";
// eslint-disable-next-line import/no-unresolved
import Button from "../../components/ui/universal/Button";
// eslint-disable-next-line import/no-unresolved
import Card from "../../components/ui/universal/Card";
// eslint-disable-next-line import/no-unresolved
import Heading from "../../components/ui/universal/Heading";

function ConnectModal(props) {
  return (
    <Card verticalPadding={4} horizontalPadding={4} shadow rounded background="pixels">
      <Heading size={1} bold underline>
        Account
      </Heading>

      <div>
        <Button size={"large"} className="options" type="secondary" onClick={() => props.close()}>
          Close modal
        </Button>
      </div>
    </Card>
  );
}

export default ConnectModal;
