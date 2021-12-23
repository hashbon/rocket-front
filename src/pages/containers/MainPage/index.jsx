import React, { useRef } from "react";
import "./index.scss";
import StarsBackgroundWrapper from "./components/StarsBackgroundWrapper/index.tsx";
import router5 from "../../../router";
import { PAGE_ROUTES } from "../../../definitions";
import BottomIcons from "./components/BottomIcons/index.tsx";
import { ReactComponent as ChangeIcon } from "./img/icons/change-icon.svg";
import { ReactComponent as PointSVG } from "./img/svg/point.svg";
import { ReactComponent as SwapSVG } from "./img/svg/swap.svg";
import { ReactComponent as ProviderSVG } from "./img/svg/provider.svg";
import { ReactComponent as InfinitySVG } from "./img/svg/infinity.svg";
import { ReactComponent as StopwatchSVG } from "./img/svg/stopwatch.svg";
import { ReactComponent as KeySvg } from "./img/svg/key.svg";
import { ReactComponent as WheelSvg } from "./img/svg/wheel.svg";
import rocket_logo from "../../../static/images/svg/rocket_logo.svg";
import pancake from "./img/icons/pancake.svg";
import uniswap from "./img/icons/uniswap.svg";
import dino from "./img/icons/dino.svg";
import etherscan from "./img/icons/etherscan-logo-light-circle.svg";
import bscscan from "./img/icons/bscscan-logo-light-circle.svg";
import coinmarketcap from "./img/icons/coinmarketcap.svg";
import telegram from "./img/icons/telegram.svg";
import linkedIn from "./img/icons/in.png";
import facebookIcon from "./img/icons/facebook.png";
import instagramIcon from "./img/icons/instagram.svg";
import github from "./img/icons/github.svg";
import bitcointalkIcon from "./img/icons/bitcointalk.png";
import cryptocompareIcon from "./img/icons/cryptocompare.png";
import bep from "./img/icons/bep.svg";
import erc from "./img/icons/erc.svg";
import net3 from "./img/icons/net3.svg";
import net4 from "./img/icons/net4.svg";
import net5 from "./img/icons/net5.svg";
import net6 from "./img/icons/net6.svg";
import net7 from "./img/icons/net7.svg";
import partners from "../../../components/common/FeaturedBy/partners.tsx";

const MainPage = () => {
  const preSaleRef = useRef(null);

  const scrollToPreSale = () => {
    const { top } = preSaleRef.current.getBoundingClientRect();
    window.scrollTo({ top: top - 130, behavior: "smooth" });
  };

  const renderMainSection = () => (
    <div className="LandingNewPage__main__container">
      <div className="LandingNewPage__main__mebius" />
      <div className="LandingNewPage__head">
        <div className="LandingNewPage__head__main">
          <span className="LandingNewPage_description">
            <span className="LandingNewPage_description-primary">C</span>DEX &mdash;
            <span className="LandingNewPage_description-primary"> Cross-chain</span>
            <br />
            Decentralized exchange platform
          </span>
          <h1 className="LandingNewPage_title">Hashbon Rocket</h1>
          <div className="LandingNewPage_title_swap">
            Swap ERC-20{" "}
            <i>
              <ChangeIcon />
            </i>{" "}
            BEP-20 Tokens
          </div>
        </div>
      </div>
      <div className="LandingNewPage__postfix">
        <div className="LandingNewPage__postfix__buttons">
          <div className="LandingNewPage__info-text">HASH token Pre-Sale is FINISHED!</div>
          <div className="LandingNewPage__buttons">
            <div className="GetHASHButton" onClick={() => router5.navigate(PAGE_ROUTES.EARN)}>
              <div className="GetHASHButton_wrapper">
                <img src={rocket_logo} alt="HASH Token" />
                <span>Stake HASH</span>
              </div>
            </div>
          </div>
          <div
            className="LandingNewPage__info-text LandingNewPage__info-text__animate bold"
            style={{ cursor: "pointer", maxWidth: "430px" }}
            onClick={scrollToPreSale}>
            More info about HASH Staking <span className="LandingNewPage__info-text__arrow">▼</span>
          </div>
        </div>
        <div className="LandingNewPage__postfix__moto">
          <div className="LandingNewPage__postfix__moto--text">
            There was no DeFi way to swap ERC-20 for BEP-20 tokens and vice versa
            <div style={{ marginTop: "10px" }}>UNTIL NOW.</div>
          </div>
        </div>
      </div>

      <BottomIcons
        left={[
          {
            link: "https://pancakeswap.finance/swap?outputCurrency=0xeb1112ac78d537853150e2a07e8b765e29d3f019",
            alt: "PancakeSwap",
            image: pancake,
          },
          {
            link: "https://app.uniswap.org/#/swap?outputCurrency=0xeb1112ac78d537853150e2a07e8b765e29d3f019",
            alt: "Uniswap",
            image: uniswap,
          },
        ]}
        right={[
          {
            link: "https://www.coingecko.com/en/coins/hash-token/historical_data/usd#panel",
            alt: "Coingecko",
            image: dino,
          },
          {
            link: "https://coinmarketcap.com/currencies/hash-token/",
            alt: "Coinmarketcap",
            image: coinmarketcap,
          },
          {
            link: "https://bscscan.com/token/0xeb1112ac78d537853150e2a07e8b765e29d3f019",
            alt: "bscscan",
            image: bscscan,
          },
          {
            link: "https://etherscan.io/token/0xeb1112ac78d537853150e2a07e8b765e29d3f019",
            alt: "etherscan",
            image: etherscan,
          },
        ]}
      />
    </div>
  );

  const renderHASHTokenSection = () => (
    <StarsBackgroundWrapper
      right={[
        {
          link: "https://t.me/hashbon_com",
          alt: "telegram",
          image: telegram,
        },
        {
          link: "https://link.hashbon.com/in",
          alt: "linkedIn",
          image: linkedIn,
        },
        {
          link: "https://link.hashbon.com/fb",
          alt: "fb",
          image: facebookIcon,
        },
        {
          link: "https://bitcointalk.org/index.php?topic=5353601",
          alt: "bitcointalk.org.com",
          image: bitcointalkIcon,
        },
        {
          link: "https://www.cryptocompare.com/coins/hash/overview",
          alt: "cryptocompare",
          image: cryptocompareIcon,
        },
        {
          link: "https://link.hashbon.com/ig",
          alt: "instagram",
          image: instagramIcon,
        },
        {
          link: "https://github.com/hashbon",
          alt: "github",
          image: github,
        },
      ]}>
      <div className="LandingNewPage__HASHToken--racoon_santa">
        <div className="LandingNewPage__HASHToken--racoon_santa__img" />
      </div>
      <div className="LandingNewPage__HASHToken--coins" />
      <div className="LandingNewPage__HASHToken">
        <div className="LandingNewPage__heading">
          <h2 className="LandingNewPage__heading_text">HASH Token</h2>
          <div className="LandingNewPage__heading_description">The fuel for Hashbon Rocket</div>
        </div>
        <div className="LandingNewPage__HASHToken--list">
          <div className="LandingNewPage__HASHToken--list__col">
            <div className="LandingNewPage__HASHToken--list__item">
              <div className="LandingNewPage__HASHToken--list__item__number">
                <PointSVG />
              </div>
              <div className="LandingNewPage__HASHToken--list__item__content">
                Liquidity Provider (LP) needs HASH Tokens. LP pays commissions to Arbiters in HASH Tokens for conducting
                transactions.
              </div>
            </div>
            <div className="LandingNewPage__HASHToken--list__item">
              <div className="LandingNewPage__HASHToken--list__item__number">
                <PointSVG />
              </div>
              <div className="LandingNewPage__HASHToken--list__item__content">
                HASH is also a governance token to vote on Hashbon Rocket. The platform is evolving thanks to HASH token
                holders and their decisions are crucial for its development. The voting process is free, however, there
                is a fee to initiate it.
              </div>
            </div>
          </div>
          <div className="LandingNewPage__HASHToken--list__col">
            <div className="LandingNewPage__HASHToken--list__item">
              <div className="LandingNewPage__HASHToken--list__item__number">
                <PointSVG />
              </div>
              <div className="LandingNewPage__HASHToken--list__item__content">
                Arbiters also need HASH Tokens. To perform the functions of an Arbiter, you need to purchase HASH Tokens
                and stake them. The more HASH Tokens the Arbiter has, the greater the power of his decision is and the
                larger share of the reward he receives from LP
              </div>
            </div>
            <div className="LandingNewPage__HASHToken--list__item">
              <div className="LandingNewPage__HASHToken--list__item__number">
                <PointSVG />
              </div>
              <div className="LandingNewPage__HASHToken--list__item__content">
                Our future services such as Launchpad, DeFi lending (bonds), Staking of third-party tokens create demand
                for HASH Tokens. In order to conduct a crowdsale on our platform, you need HASH Tokens to issue bonds.
              </div>
            </div>
          </div>
        </div>
      </div>
    </StarsBackgroundWrapper>
  );

  const renderHowRocketWorksSection = () => (
    <StarsBackgroundWrapper
      right={[
        {
          isNotLink: true,
          alt: "ERC-20",
          image: erc,
        },
        {
          isNotLink: true,
          alt: "BEP-20",
          image: bep,
        },
        {
          isNotLink: true,
          alt: "NET",
          image: net3,
        },
        {
          isNotLink: true,
          alt: "NET",
          image: net4,
        },
        {
          isNotLink: true,
          alt: "NET",
          image: net5,
        },
        {
          isNotLink: true,
          alt: "NET",
          image: net6,
        },
        {
          isNotLink: true,
          alt: "NET",
          image: net7,
        },
      ]}>
      <div className="LandingNewPage__HowRocketWorks--rocket" />
      <div className="LandingNewPage__HowRocketWorks">
        <div className="LandingNewPage__heading">
          <h2 className="LandingNewPage__heading_text">How Rocket Works</h2>
        </div>
        <div className="LandingNewPage__HowRocketWorks--description">
          Hashbon Rocket is the first cross-chain decentralized token exchange introduced by Hashbon (founded in 2016).
        </div>
        <div className="LandingNewPage__HowRocketWorks--list">
          <div className="LandingNewPage__HowRocketWorks--list__item">
            <div className="LandingNewPage__HowRocketWorks--list__item__header">
              <div className="LandingNewPage__HowRocketWorks--list__item__header__point">
                <PointSVG />
              </div>
              <div className="LandingNewPage__HowRocketWorks--list__item__header__text">Liquidity Provider</div>
            </div>
            <div className="LandingNewPage__HowRocketWorks--list__item__description">
              Liquidity Provider uses Hashbon Rocket to set a trading pair, transferring ERC-20 and BEP-20 tokens to
              smart contracts
            </div>
          </div>
          <div className="LandingNewPage__HowRocketWorks--list__item">
            <div className="LandingNewPage__HowRocketWorks--list__item__header">
              <div className="LandingNewPage__HowRocketWorks--list__item__header__point">
                <PointSVG />
              </div>
              <div className="LandingNewPage__HowRocketWorks--list__item__header__text">Client</div>
            </div>
            <div className="LandingNewPage__HowRocketWorks--list__item__description">
              Client transfers tokens to one chain and receives tokens from the other
            </div>
          </div>
          <div className="LandingNewPage__HowRocketWorks--list__item">
            <div className="LandingNewPage__HowRocketWorks--list__item__header">
              <div className="LandingNewPage__HowRocketWorks--list__item__header__point">
                <PointSVG />
              </div>
              <div className="LandingNewPage__HowRocketWorks--list__item__header__text">Arbiters</div>
            </div>
            <div className="LandingNewPage__HowRocketWorks--list__item__description">
              Network of Arbiters confirms the deal and carries out cross-chain communication
            </div>
          </div>
        </div>
      </div>
    </StarsBackgroundWrapper>
  );

  const renderPerSaleSection = () => (
    <StarsBackgroundWrapper>
      <div className="LandingNewPage__PreSale" ref={preSaleRef}>
        <div className="LandingNewPage__heading">
          <h2 className="LandingNewPage__heading_text">Keep calm and stake your HASH</h2>
        </div>

        <div className="LandingNewPage__PreSale__container" style={{ color: "white" }}>
          {/* <Progress participants={323} amount={876900} target={1000000} /> */}
          <div className="LandingNewPage__PreSale__description--big">
            Stake HASH with a maximum APY of 171.46%
            <br />
            15 000 000 HASH for staking reward!
          </div>
          <br />
          <div className="LandingNewPage__PreSale__buttons">
            <div
              className="LandingNewPage__PreSale__button GradientButton"
              onClick={() => router5.navigate(PAGE_ROUTES.EARN)}>
              <div className="GradientButton_wrapper">
                <img src={rocket_logo} alt="HASH Token" />
                <span>Stake HASH</span>
              </div>
            </div>
            <div
              className="LandingNewPage__PreSale__button GetHASHButton"
              onClick={() => router5.navigate(PAGE_ROUTES.FAQ)}>
              <div className="GetHASHButton_wrapper">
                <span>How to stake</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </StarsBackgroundWrapper>
  );

  const renderWhyAreWeAwesomeSection = () => (
    <StarsBackgroundWrapper>
      <div className="LandingNewPage__WhyAreWeAwesome">
        <div className="LandingNewPage__heading">
          <h2 className="LandingNewPage__heading_text">Why Are We Awesome</h2>
        </div>
        <div className="LandingNewPage__WhyAreWeAwesome--list">
          <div className="LandingNewPage__WhyAreWeAwesome--list__row">
            <div className="LandingNewPage__WhyAreWeAwesome--list__item">
              <div className="LandingNewPage__WhyAreWeAwesome--list__item__icon">
                <SwapSVG />
              </div>
              <div className="LandingNewPage__WhyAreWeAwesome--list__item__text">
                First cross-chain DEX solving the ERC-20 to BEP-20 swapping problem
              </div>
            </div>
            <div className="LandingNewPage__WhyAreWeAwesome--list__item">
              <div className="LandingNewPage__WhyAreWeAwesome--list__item__icon">
                <ProviderSVG />
              </div>
              <div className="LandingNewPage__WhyAreWeAwesome--list__item__text">
                Anyone can be a Liquidity Provider and create a pool
              </div>
            </div>
          </div>
          <div className="LandingNewPage__WhyAreWeAwesome--list__row">
            <div className="LandingNewPage__WhyAreWeAwesome--list__item">
              <div className="LandingNewPage__WhyAreWeAwesome--list__item__icon">
                <InfinitySVG />
              </div>
              <div className="LandingNewPage__WhyAreWeAwesome--list__item__text">
                There are no exchange limits. You can exchange any amount of tokens
              </div>
            </div>
            <div className="LandingNewPage__WhyAreWeAwesome--list__item">
              <div className="LandingNewPage__WhyAreWeAwesome--list__item__icon">
                <StopwatchSVG />
              </div>
              <div className="LandingNewPage__WhyAreWeAwesome--list__item__text">
                Low exchange fees and high transaction speed
              </div>
            </div>
          </div>
          <div className="LandingNewPage__WhyAreWeAwesome--list__row">
            <div className="LandingNewPage__WhyAreWeAwesome--list__item">
              <div className="LandingNewPage__WhyAreWeAwesome--list__item__icon">
                <KeySvg />
              </div>
              <div className="LandingNewPage__WhyAreWeAwesome--list__item__text">
                Swap fairness is ensured by single-step decentralized arbitrage
              </div>
            </div>
            <div className="LandingNewPage__WhyAreWeAwesome--list__item">
              <div className="LandingNewPage__WhyAreWeAwesome--list__item__icon">
                <WheelSvg />
              </div>
              <div className="LandingNewPage__WhyAreWeAwesome--list__item__text">
                Today Hashbon Rocket supports Ethereum and Binance Smart Chain, later – Cardano, Tron, Fantom, etc
              </div>
            </div>
          </div>
        </div>
        <div className="LandingNewPage__WhyAreWeAwesome--FeatureBy">
          <div className="LandingNewPage__heading">
            <h2 className="LandingNewPage__heading_text">They Talk About Us</h2>
          </div>

          <div className="LandingNewPage__WhyAreWeAwesome--FeatureBy__list">
            {partners.map((item) => (
              <a key={item.link} href={item.link} className="LandingNewPage__WhyAreWeAwesome--FeatureBy__list--item">
                <img src={item.img} alt={item.alt} />
              </a>
            ))}
          </div>
        </div>
      </div>
      <div className="LandingNewPage__WhyAreWeAwesome--planet" />
      <div className="LandingNewPage__WhyAreWeAwesome--racoon" />
    </StarsBackgroundWrapper>
  );

  return (
    <div className="LandingNewPage">
      <div className="LandingNewPage__main">{renderMainSection()}</div>
      <div className="LandingNewPage__steps">
        {renderHASHTokenSection()}
        {renderHowRocketWorksSection()}
        {renderPerSaleSection()}
        {renderWhyAreWeAwesomeSection()}
      </div>
    </div>
  );
};

export default MainPage;
