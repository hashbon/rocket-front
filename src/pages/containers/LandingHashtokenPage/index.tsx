import React, { useEffect } from "react";
import "./index.scss";
import { useDispatch } from "react-redux";
import { CopyToClipboard } from "react-copy-to-clipboard";
import cogoToast from "cogo-toast";
import rocket_logo from "../../../static/images/svg/rocket_logo.svg";
import m from "./img/m.svg";
import dino from "./img/dino.svg";
import binance from "./img/binance.svg";
import etherium from "./img/etherium.svg";
import pancake from "./img/pancake.svg";
import burger from "./img/burger.svg";
import consbit from "./img/consbit.svg";
import uniswap from "./img/uniswap.svg";
import link from "./img/link1.svg";
import reddit from "./img/reddit.svg";
import instagram from "./img/instagram.svg";
import twitter from "./img/twitter.svg";
import facebook from "./img/facebook.svg";
import linkedin from "./img/linkedin.svg";
import telegram from "./img/telegram.svg";
import { ReactComponent as CopySVG } from "./img/copy.svg";
import mebius from "./img/mebius.png";
import useLangs from "../../../hooks/useLangs";
import { commonActions } from "../../../store/actions";
import router5 from "../../../router";
import { PAGE_ROUTES } from "../../../definitions";
import { FeatureBy } from "../../../components/common/FeaturedBy";

const LandingHashtokenPage: React.FC = () => {
  const { languages } = useLangs();
  const dispatch = useDispatch();

  useEffect(() => {
    window.scrollTo(0, 0);
    dispatch(commonActions.getLangs());
  }, []);

  return (
    <div className="LandingHashtokenContainer">
      <div className="background-ballon background-ballon_one" />
      <div className="background-ballon background-ballon_two" />
      <div className="background-ballon background-ballon_three" />
      <div className="background-ballon background-ballon_four" />

      <img src={mebius} className="background_mebius" alt="" />
      <div className="LandingHashtokenPage">
        <div className="HashToken_container">
          <div className="HashToken_info">
            <h1 className="HashToken_info-title">HASH Token</h1>
            <span className="HashToken_info-description">
              {languages["hashtoken.text.0"]}
              <br />
              <br />
              {languages["hashtoken.text.1"]}
              <br />
              <ul>
                <li>{languages["hashtoken.text.2"]}</li>
                <li>{languages["hashtoken.text.3"]}</li>
              </ul>
              {languages["hashtoken.text.4"]}
            </span>
            <div className="HashToken_info-platforms">
              <a rel="noopener noreferrer" target="_blank" href="https://coinmarketcap.com/currencies/hash-token/">
                <img className="HashToken_info-platforms_icon" src={m} alt="CoinMarketCap" />
                <div>
                  <div className="HashToken_info-platforms_text">CoinMarketCap</div>
                </div>
              </a>
              <a
                rel="noopener noreferrer"
                target="_blank"
                href="https://www.coingecko.com/en/coins/hash-token/historical_data/usd#panel">
                <img className="HashToken_info-platforms_icon" src={dino} alt="CoinGecko" />
                <div>
                  <div className="HashToken_info-platforms_text">CoinGecko</div>
                </div>
              </a>
            </div>

            <div className="HashToken_info-platforms_buttons">
              <button
                className="HashToken_info-platforms_gradient-button"
                onClick={() => router5.navigate(PAGE_ROUTES.CROWDSALE)}>
                <img src={rocket_logo} alt="Hashbon Rocket" />
                <span style={{ marginLeft: 15 }}>Get HASH</span>
              </button>
            </div>
          </div>
          <div className="HashToken_distribution">
            <div className="HashToken_distribution-header">
              <span className="HashToken_distribution-title">{languages["hashtoken.distribution.title"]}</span>
              <img className="HashToken_distribution-logo" src={rocket_logo} alt="Hashbon" />
            </div>
            <div className="HashToken_distribution-table HashToken_distribution-table_top">
              <span>%</span>
              <span>Name</span>
              <span>Amount</span>
            </div>
            <div className="HashToken_distribution-table_hr" />
            <div className="HashToken_distribution-table HashToken_distribution-table_main">
              <span>100%</span>
              <h6>{languages["hashtoken.distribution.total"]}</h6>
              <span>1 000 000 000</span>
              <span>40%</span>
              <h6>{languages["hashtoken.distribution.team"]}</h6>
              <span>400 000 000</span>
              <span>40%</span>
              <h6>{languages["hashtoken.distribution.sold"]}</h6>
              <span>400 000 000</span>
              <span>10%</span>
              <h6>{languages["hashtoken.distribution.charity"]}</h6>
              <span>100 000 000</span>
              <span>7.5%</span>
              <h6>{languages["hashtoken.distribution.staking"]}</h6>
              <span>75 000 000</span>
              <span>2.5%</span>
              <h6>{languages["hashtoken.distribution.bounty"]}</h6>
              <span>25 000 000</span>
            </div>
            <div className="HashToken_distribution-table HashToken_distribution-table_top">Initial distribution:</div>
            <div className="HashToken_distribution-table_hr" />

            <div className="HashToken_distribution-table HashToken_distribution-table_main">
              <span>5%</span>
              <h6>Private Sale</h6>
              <span>50 000 000</span>
              <span>5%</span>
              <h6>CrowdSale incl Pre-sale</h6>
              <span>50 000 000</span>
              <span>5%</span>
              <h6>Reserve for exchanges</h6>
              <span>50 000 000</span>
              <span>2.5%</span>
              <h6>Bounty & Ambassadors | Advisors</h6>
              <span>25 000 000</span>
            </div>
          </div>
        </div>
      </div>
      <div style={{ height: 320 }}>
        <FeatureBy />
      </div>
      <div className="LandingHashtokenPage">
        <div className="HashToken_platforms">
          <span className="HashToken_platforms_title">{languages["hashtoken.available"]}</span>
          <div className="HashToken_platforms_hr" />
          <div className="HashToken_platforms_table">
            <div className="HashToken_platforms_platform">
              <img src={binance} alt="binance" className="HashToken_platforms_platform-logo" />
              <span className="HashToken_platforms_platform-name">Binance Smart Chain</span>
              <span className="HashToken_platforms_platform-address">
                <a rel="noopener noreferrer" target="_blank" href="https://link.hashbon.com/smartcontractbsc">
                  0xeb1112ac78d537853150e2a07e8b765e29d3f019
                </a>
                <div className="HashTokenCopyIcon">
                  <CopyToClipboard
                    text={"0xeb1112ac78d537853150e2a07e8b765e29d3f019"}
                    onCopy={() => {
                      cogoToast.info("Copied");
                    }}>
                    <CopySVG />
                  </CopyToClipboard>
                </div>
              </span>
              <div className="HashToken_platforms_platform-support-container">
                <a
                  target="_blank"
                  rel="noopener noreferrer"
                  href="https://pancakeswap.finance/swap?outputCurrency=0xeb1112ac78d537853150e2a07e8b765e29d3f019">
                  <div className="HashToken_platforms_platform-support">
                    <img src={pancake} alt="pancake" />
                  </div>
                </a>
                <a
                  target="_blank"
                  rel="noopener noreferrer"
                  href="https://burgerswap.org/trade/swap?from=BNB&to=0xeb1112ac78d537853150e2a07e8b765e29d3f019">
                  <div className="HashToken_platforms_platform-support">
                    <img src={burger} alt="burger" />
                  </div>
                </a>
              </div>
            </div>
            <div className="HashToken_platforms_vertical-hr" />
            <div className="HashToken_platforms_platform">
              <img src={etherium} alt="ethereum" className="HashToken_platforms_platform-logo" />
              <span className="HashToken_platforms_platform-name">Ethereum Mainnet</span>
              <span className="HashToken_platforms_platform-address">
                <a rel="noopener noreferrer" target="_blank" href="https://link.hashbon.com/smartcontract">
                  0xeb1112ac78d537853150e2a07e8b765e29d3f019
                </a>
                <div className="HashTokenCopyIcon">
                  <CopyToClipboard
                    text={"0xeb1112ac78d537853150e2a07e8b765e29d3f019"}
                    onCopy={() => {
                      cogoToast.info("Copied");
                    }}>
                    <CopySVG />
                  </CopyToClipboard>
                </div>
              </span>
              <div className="HashToken_platforms_platform-support-container">
                <a
                  rel="noopener noreferrer"
                  target="_blank"
                  href="https://app.uniswap.org/#/swap?outputCurrency=0xeb1112ac78d537853150e2a07e8b765e29d3f019">
                  <div className="HashToken_platforms_platform-support">
                    <img src={uniswap} alt="uniswap" />
                  </div>
                </a>
                <a rel="noopener noreferrer" target="_blank" href="https://coinsbit.io/trade_classic/HASH_USDT">
                  <div className="HashToken_platforms_platform-support">
                    <img src={consbit} alt="consbit" />
                  </div>
                </a>
              </div>
            </div>
          </div>
        </div>
        <div className="HashToken_links">
          <a href="https://t.me/hashbon_com" target="_blank" rel="noopener noreferrer">
            <img alt="telegram" src={telegram} />
          </a>
          <a href="https://link.hashbon.com/in" rel="noopener noreferrer" target="_blank">
            <img alt="linkedin" src={linkedin} />
          </a>
          <a href="https://link.hashbon.com/fb" rel="noopener noreferrer" target="_blank">
            <img alt="facebook" src={facebook} />
          </a>
          <a href="https://link.hashbon.com/tw" rel="noopener noreferrer" target="_blank">
            <img alt="twitter" src={twitter} />
          </a>
          <a href="https://link.hashbon.com/ig" rel="noopener noreferrer" target="_blank">
            <img alt="instagram" src={instagram} />
          </a>
          <div className="HashToken_links_hr" />
          <a href="https://www.reddit.com/r/hashbon/" rel="noopener noreferrer" target="_blank">
            <img alt="reddit" src={reddit} />
          </a>
          <a href="https://hashbon.medium.com/" rel="noopener noreferrer" target="_blank">
            <img alt="medium" src={link} />
          </a>
        </div>
        <span className="HashToken_lorem-ipsum">{/* {languages["loremIpsum"]} */}</span>
      </div>
    </div>
  );
};

export default LandingHashtokenPage;
