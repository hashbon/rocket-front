import "./index.scss";
import React from "react";
import { ReactComponent as LoaderIcon } from "../../../pages/containers/SwapPage/components/SwapForm/assets/icons/loading.svg";
import { ReactComponent as DoneIcon } from "../../../pages/containers/SwapPage/components/SwapForm/assets/icons/checked.svg";

interface IFormLoadingStatusProps {
  isLoading: boolean;
  isDone: boolean;
  renderDoneText?: any
}

const FormLoadingStatus: React.FC<IFormLoadingStatusProps> = ({ isLoading = false, isDone = false, renderDoneText = () => "Success!" }) => {
  if (isDone || isLoading) {
    return (
      <div className="FormLoadingStatus">
        <div className="FormLoadingStatus__icon">
          {isLoading ? <LoaderIcon /> : <DoneIcon />}
        </div>
        <div className="FormLoadingStatus__container">
          <div className="FormLoadingStatus__title">
            {isLoading ? "Processing" : "Done"}
          </div>
          <div className="FormLoadingStatus__text">
            {isLoading ? "Please wait" : renderDoneText()}
          </div>
        </div>
      </div>
    );
  }

  return <div className="FormLoadingStatus"/>;
};

export default FormLoadingStatus;