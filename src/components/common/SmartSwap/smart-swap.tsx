import "./index.scss";
import "./steps.scss";
import React from "react";
import { Steps } from "antd";
import { FormSteps } from "pages/containers/SwapPage/components/SwapForm";
import { ReactComponent as ShareIcon } from "./assets/icons/share.svg";
import { ReactComponent as LoaderIcon } from "./assets/icons/loading.svg";
import Button from "../../ui/universal/Button";
import router from "../../../router";
import { PAGE_ROUTES } from "../../../definitions";
import useGetNetworks from "../../../hooks/useGetNetworks";

const { Step } = Steps;

const StepsCurrentIcon = <div className="SmartSwapModal_steps_current-icon" />;

export const StepListItemComponent = ({ shareLink = "", title = <div />, subTitle = <div /> }) => (
  <div className="StepListItemComponent">
    <div className="StepListItemComponent_content">
      <div className="StepListItemComponent_title">
        <span>{title}</span>
      </div>
      <div className="StepListItemComponent_subtitle">
        <span>{subTitle}</span>
      </div>
    </div>
    {!!shareLink.length && (
      <div onClick={() => window.open(shareLink, "_blank")} className="StepListItemComponent_action">
        <ShareIcon />
      </div>
    )}
  </div>
);

const SmartSwapComponent = (props: any) => {
  const { title, description, firstStepContent, formStep = FormSteps.DRAFT, fromNetId } = props;
  const { getNetworkById } = useGetNetworks();
  const fromNetName = getNetworkById(fromNetId).name;

  return (
    <div className="SmartSwapModal SmartSwapModal_wrapper">
      <div className="SmartSwapModal_title">
        <span>{title}</span>
      </div>
      <div className="SmartSwapModal_description">
        <span>{description}</span>
      </div>

      {FormSteps.SUCCESS === formStep ? (
        <div className="display_flex w-100" style={{ marginBottom: 20 }}>
          <Button
            rounded
            shadow
            size="pre_hyper"
            mode="secondary"
            style={{ margin: "auto auto 24px auto" }}
            onClick={() => {
              router.navigate(PAGE_ROUTES.ORDERS);
            }}>
            Go to Orders and pay
          </Button>
        </div>
      ) : (
        <div className="w-100 display_flex">
          <div className="SmartSwapModal_loader">
            <LoaderIcon />
          </div>
        </div>
      )}

      <Steps direction="vertical" current={FormSteps.SUCCESS === formStep ? 1 : 0} className="SmartSwapModal_steps">
        <Step icon={FormSteps.SUCCESS === formStep ? null : StepsCurrentIcon} description={firstStepContent} />
        <Step
          icon={FormSteps.SUCCESS === formStep ? StepsCurrentIcon : null}
          description={
            <StepListItemComponent
              title={
                <div>
                  <div>Pay</div>
                  <div>Waiting</div>
                </div>
              }
              subTitle={<div>{FormSteps.SUCCESS === formStep && <div>Waiting</div>}</div>}
              shareLink={""}
            />
          }
        />
        <Step
          icon={null}
          description={
            <StepListItemComponent
              title={
                <div>
                  <div>
                    <strong>{fromNetName}</strong> Withdraw
                  </div>
                  <div>Waiting</div>
                </div>
              }
              shareLink={""}
            />
          }
        />
      </Steps>
    </div>
  );
};

export const SmartSwap = React.memo(SmartSwapComponent);
