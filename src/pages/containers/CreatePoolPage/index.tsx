import "./index.scss";
import React from "react";
import Spacer from "../../../components/ui/universal/Spacer";
import CreatePoolForm from "../../../components/common/CreatePoolForm";
import { AccentWindowWrapper } from "../../../components/common/AccentWindowWrapper";

const CreatePoolPage = () => (
  <div>
    <AccentWindowWrapper title="Create a pool">
      <CreatePoolForm />
    </AccentWindowWrapper>
    <Spacer size={6} />
  </div>
);

export default CreatePoolPage;
