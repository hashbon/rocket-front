import "./index.scss";
import React, { useEffect } from "react";
import { v4 as uuidv4 } from "uuid";
import { Link } from "react-router5";
import Spacer from "../../../components/ui/universal/Spacer";
import AccordionItem from "./components/AccordionItem";
import { PAGE_ROUTES } from "../../../definitions";

const accordionData = [
  {
    title: "What is the Hashbon Staking Referral Program?",
    description: (
      <>
        <p>
          Hashbon Rocket’s Staking Referral Program is a unique opportunity for all Hashbon Rocket users and HASH
          holders. Now any user can invite their friends (there is no limit on the number of referrals per user) to join{" "}
          <Link routeName={PAGE_ROUTES.EARN}>Hashbon’s Staking and its Referral Program</Link> – and get rewards for it.
          To get maximum profit, share your personal Hashbon Staking referral link and start inviting your friends,
          family and other crypto enthusiasts to register. You’ll receive your benefits in return.
        </p>
      </>
    ),
  },
  {
    title: "How does it work?",
    description:
      "Each Hashbon Rocket user is assigned a one-of-a-kind referral link. When you want to share this link with your friends and make them a part of the decentralized future, you just copy the referral link and send it to them. Once they stake, you, as an owner of the referral link, gain 10% of your friend’s earnings.",
  },
  {
    title: "Where is my referral link?",
    description:
      "You can find it right below the button “Smart contract” on the left side panel – “Copy Referral Link”. Just click it and share the copied link with a friend.",
  },
  {
    title: "What referral rewards can I receive?",
    description: "You will receive 10% of your friends’ earnings.",
  },
  {
    title: "Who can participate in the Referral Program?",
    description: (
      <p>
        Our doors are open for each crypto enthusiast. It’s important to keep in mind that we follow some rules. When
        staking you will have to sign a contract stating that you aren’t and never was a resident/citizen of the USA.
        For more info, please see <Link routeName={PAGE_ROUTES.FAQ}>Staking FAQ</Link>.
      </p>
    ),
  },
  {
    title: "Why would I participate in the Referral Program?",
    description: (
      <>
        <p>
          With the introduction of the referral program, HASH holders gain one more revenue stream through owning HASH
          tokens and participating in Hashbon Rocket’s DeFi ecosystem.
        </p>
        <p>
          Depending on how many friends you’ve invited and how much they’re staking, this revenue stream may become
          substantial.
        </p>
      </>
    ),
  },
  {
    title: "Do I need to pay to participate?",
    description: (
      <p>
        Joining the Hashbon Staking Referral Program is completely free of charge, all you need to start your way is to
        start <Link routeName={PAGE_ROUTES.FAQ}>staking HASH</Link> and send your link to others. Please keep in mind
        that when interacting with any smart contract (in this case, the staking contract), the Binance Smart Chain will
        require a transaction fee. It should be a small amount so please make sure you have enough BNB to cover
        transaction costs.
      </p>
    ),
  },
  {
    title: "How long will the Referral Program last?",
    description:
      "The Referral Program will last for the entire duration of the staking (not less than a year from December, 9, 2021.)",
  },
  {
    title: "Where can I find support for technical questions?",
    description: (
      <>
        <p>
          You can find support on all rising issues through the Hashbon community. Not only Hashbon Rocket founders will
          help you, but there are a lot of members ready to help. Feel free to ask any question, but don’t forget about
          community rules – be respectful to everyone. You can join the chat{" "}
          <a href={"https://t.me/hashbon_chat"} target="_blank" rel="noreferrer">
            here
          </a>
          .
        </p>
      </>
    ),
  },
  {
    title: "When will I receive the referral reward?",
    description:
      "You will get your referral reward as your friends receive their staking earnings. This means that when your friends receive their staking rewards, you’ll in turn receive your percentage accordingly.",
  },
  {
    title: "How can I check my commission history?",
    description: (
      <p>
        Your commission history is described in the{" "}
        <a
          href={"https://bscscan.com/address/0xa3a87bad140f5165eabc584f6a652e39cf638548"}
          target="_blank"
          rel="noreferrer">
          staking smart contact
        </a>
        , you can see it anytime you need.
      </p>
    ),
  },
  {
    title: "How many friends can I invite?",
    description:
      "There is no limit on how many friends you can invite through your referral link. You can invite as many as you’d like, meaning that your profit will grow with every person you invite while at the same time, making HASH token more sustainable.",
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
          <span>Hashbon Staking Referral Program FAQ</span>
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
