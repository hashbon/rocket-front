import "./index.scss";
import React from "react";
import Spacer from "../../../components/ui/universal/Spacer";
import EditPoolForm from "../../../components/common/EditPoolForm";
import { AccentWindowWrapper } from "../../../components/common/AccentWindowWrapper";

const EditPoolPage = () => (
  <div>
    <AccentWindowWrapper title="Edit the pool">
      <EditPoolForm />
    </AccentWindowWrapper>
    <Spacer size={6} direction="vertical" />
  </div>
);

export default EditPoolPage;
