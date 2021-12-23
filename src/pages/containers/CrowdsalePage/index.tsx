import "./index.scss";
import React, { useEffect } from "react";
import { Link } from "react-router5";
import Button from "../../../components/ui/universal/Button";
import Astronaut from "./components/Astronaut";
import Spacer from "../../../components/ui/universal/Spacer";
import router5 from "../../../router";
import { PAGE_ROUTES } from "../../../definitions";
import Progress from "./components/Progress";
import InvestorClaim from "./components/InvestorClaim";

const CrowdsalePage = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <>
      <div className="CrowdsalePage_wrapper">
        <div className="CrowdsalePage__double-heading">
          <div className="CrowdsalePage__double-heading_title">HASH Token Pre-Sale</div>
          <div className="CrowdsalePage__double-heading_description">Finished!</div>
        </div>

        <Progress participants={340} amount={922260} target={1000000} />

        <Spacer size={15} />

        <p className="CrowdsalePage_main-description">
          Thank you for your support and faith in <Link routeName={PAGE_ROUTES.MAIN}>Hashbon Rocket’s</Link> launch!
          <br />
          We coudn’t have run the{" "}
          <a href="https://btcmanager.com/hashbon-rocket-defi-cross-chain-dex/" target="_blank" rel="noreferrer">
            first-ever Cross-Chain DEX
          </a>{" "}
          without you.
          <br />
          Now we are excited to share the detailed report of Hashbon Rocket’s development for the Pre-Sale period.
        </p>
        <Spacer size={15} />
        <h2 className="CrowdsalePage_second-heading">Claim your HASH</h2>

        <InvestorClaim />

        <Spacer size={15} />

        <div className="CrowdsalePage_linkButtons">
          <div className="CrowdsalePage_linkButtons-button">
            <Button
              size="hyper"
              mode="outline_gray"
              onClick={() => {
                window.open("https://rocket.hashbon.com/files/WP_05.08.2021.pdf", "_blank");
              }}>
              <div className="display_flex">
                <div>Whitepaper</div>
              </div>
            </Button>
          </div>
          <div className="CrowdsalePage_linkButtons-button">
            <Button
              size="hyper"
              mode="outline_gray"
              onClick={() => {
                window.open("https://rocket.hashbon.com/files/rocket__litepaper_EN.pdf", "_blank");
              }}>
              <div className="display_flex">
                <div>Litepaper</div>
              </div>
            </Button>
          </div>
          <div className="CrowdsalePage_linkButtons-button">
            <Button
              size="hyper"
              mode="outline_gray"
              onClick={() => {
                window.open("https://hashbon.medium.com/hash-tokenomics-5d636d2eb92", "_blank");
              }}>
              <div className="display_flex">
                <div>Tokenomics</div>
              </div>
            </Button>
          </div>
          <div className="CrowdsalePage_linkButtons-button">
            <Button
              size="hyper"
              mode="outline_gray"
              onClick={() => {
                router5.navigate(PAGE_ROUTES.ROADMAP);
              }}>
              <div className="display_flex">
                <div>Roadmap</div>
              </div>
            </Button>
          </div>
        </div>
      </div>
      <Spacer size={15} />
      <Astronaut />
    </>
  );
};

export default CrowdsalePage;
