import "./index.scss";
import React, { useEffect } from "react";
import { v4 as uuidv4 } from "uuid";
import Spacer from "../../../components/ui/universal/Spacer";
import AccordionItem from "./components/AccordionItem";

const accordionData = [
  {
    title: "Why Hashbon staking? Is it more profitable than other HASH staking opportunities?",
    description: (
      <>
        <p>This is our very own staking, natively integrated into the Hashbon Rocket DeFi ecosystem.</p>
        <p>
          It offers the most intuitive experience and profitable conditions out of any other HASH staking opportunities
          on third-party platforms.
        </p>
      </>
    ),
  },
  // {
  //   title: "How easy is it to stake HASH?",
  //   description:
  //     "Really easy. Please follow this 1-2-3 steps guide [Link to guide] with screenshots. (Guide will be ready shortly)",
  // },
  {
    title: "What standards of HASH token support staking?",
    description: (
      <>
        <p>
          As you may know, HASH is compiled with ERC-20 and BEP-20 standards. The token address is
          0xeb1112ac78d537853150e2a07e8b765e29d3f019 for both networks.
        </p>
        <p>
          Currently we are introducing HASH staking for its BEP-20 version. We have staking opportunities for ERC-20
          HASH holders as well. For example, please check out our farming pool on{" "}
          <a href={"https://unifarm.co/"} target="_blank" rel="noreferrer">
            Unifarm
          </a>
          .
        </p>
      </>
    ),
  },
  {
    title: "What are the max APR and APY? How to calculate them?",
    description: (
      <>
        <p>
          The max APR is 100%, it can be achieved while staking for 1 year. As for APY, the maximum rate is 171.46%.
        </p>
        <p>
          <a href={"https://www.aprtoapy.com/"} target={"_blank"} rel="noreferrer">
            Here
          </a>{" "}
          you can convert APR to ARY to calculate them in advance while the staking interface reflects the current rates
          while inserting the amount of tokens.
        </p>
      </>
    ),
  },
  {
    title: "How many HASH tokens are dedicated for staking?",
    description: "The reward pool for staking is 15,000,000 HASH tokens.",
  },
  {
    title: "How much is the minimum or maximum amount I can stake?",
    description:
      "There is no limit on how much you could stake. However, if you don’t stake a considerable amount, then the transaction fee may be too high compared to staking benefits.",
  },
  {
    title: "Why have staking conditions changed? Why is the staking APY dynamic?",
    description: (
      <>
        <p>
          The annual percentage yield (APY) is the real rate of return earned on an investment, taking into account the
          effect of compounding interest. Unlike simple interest, compounding interest is calculated periodically and
          the amount is immediately added to the balance.
        </p>
        <p>
          With each period going forward, the account balance gets a little bigger, so the interest paid on the balance
          gets bigger as well.
        </p>
      </>
    ),
  },
  {
    title: "What are the min and max durations of staking? Can I stake tokens just for 1 year or there is no limit?",
    description:
      "The max duration is 1 year and you can withdraw tokens at any moment after staking. Our advice is not to rush – the longer your staking period is, the higher your APY will be.",
  },
  {
    title: "Is it safe to stake HASH?",
    description: (
      <p>
        Yes, it is. These are your tokens and they will remain at your disposal. All the conditions are fixed in
        Hashbon’s staking{" "}
        <a
          href={"https://bscscan.com/address/0xa3a87bad140f5165eabc584f6a652e39cf638548"}
          target={"_blank"}
          rel="noreferrer">
          smart contract
        </a>
        .
      </p>
    ),
  },
  {
    title: "Will I be able to use my HASH if it’s staking?",
    description:
      "Using your tokens isn’t possible once they’re staked. You may retrieve your tokens at any point if you wish to do so, however, when they’re staked, the tokens are locked until you decide otherwise.",
  },
  {
    title: "Where will my tokens be placed if I stake?",
    description:
      "Your tokens will be in a pool, literally in the smart contract which is dedicated to HASH native staking.",
  },
  {
    title: "What are gas and transaction request fees?",
    description:
      "There are transaction fees when staking and unstaking. This fee isn’t from Hashbon’s side, but from the side of the Binance Smart Chain as every transaction has a gas fee. Before staking, please make sure you have enough in your wallet to cover transaction costs.",
  },
  {
    title: "What if I stake and then change my mind, will there be additional network fees?",
    description: "Yes, any transaction will result in a fee that needs to be covered.",
  },
  {
    title:
      "If I press the “Collect” button, do I just collect my rewards? Or will I withdraw my staked tokens and profits?",
    description: "Upon clicking “Collect”, you’ll receive your rewards only, your staked HASH will remain staked.",
  },
  {
    title: "Under what conditions will the APR be less than 100%?",
    description:
      "We have our own formula that decides the APR. Here it is: APR = J/TVL * T/M,  J represents the amount of rewards left while М represents the number of blocks left until the end of the staking period, and T = 10512000 (number of blocks a year). When staking starts, the TVL (total value locked) should be more than J for the APR to be less than 100%.",
  },
  {
    title: "Can I unstake my HASH at any time?",
    description:
      "Yes. At any point you may unstake your HASH tokens. Please make sure you have enough to cover transaction costs as the network will take a fee for transferring your HASH from the smart contract to your wallet.",
  },
  {
    title: "Will there be a dump when staking ends?",
    description:
      "We plan to continuously develop Hashbon Rocket, its products, and features. Thus, the demand on HASH token and its price don’t depend solely on staking operations. Besides, Hashbon staking may be prolonged in the future – HASH tokenomics speaks of 75,000,000 tokens dedicated to staking.",
  },
  {
    title: "Can anyone stake HASH tokens?",
    description:
      "Anyone can stake HASH, provided that you’re not a resident/citizen of the United States of America. When staking you will have to sign a contract stating that you aren’t and never was a resident/citizen of the USA.",
  },
  {
    title: "Do we have to pass KYC when getting rewards and unstaking?",
    description: "We don’t expect to hold KYC for staking.",
  },
  {
    title: "What are the special staking conditions for Hashbon",
    description: "Hashbon Rocket’s early investors have special staking",
  },
  {
    title: "Pre-Sale participants?",
    description: (
      <>
        <p>
          Bonus terms (APY, %) – 231% max. For Pre-Sale participants we will design their own page for staking, it will
          be available via private invite. Please, stay tuned in our{" "}
          <a href={"https://t.me/hashbon_chat"} target={"_blank"} rel="noreferrer">
            Hashbon Community
          </a>
          .
        </p>
      </>
    ),
  },
];

const Page = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  return (
    <div className="FAQPage">
      <div className="FAQPage_wrapper">
        <div className="FAQPage_wrapper_title">
          <span>Staking FAQ</span>
        </div>
        <Spacer size={6} />
        <div>
          {accordionData.map((item) => (
            <div key={uuidv4()}>
              <AccordionItem {...item} />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Page;
