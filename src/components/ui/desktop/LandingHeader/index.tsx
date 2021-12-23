import React, { useEffect, useRef, useState } from "react";
import "./index.scss";
import { Link } from "react-router5";
import { ReactComponent as Burger } from "./img/burger.svg";
import { ReactComponent as Logo } from "../../../../static/images/svg/logo.svg";
import { useMobileDetect } from "../../../../hooks/useMobileDetect";
import classNames from "../../../../utils/classNames";
import { PAGE_ROUTES } from "../../../../definitions";
import Button from "../../universal/Button";
import router from "../../../../router";
import * as DropActions from "../../universal/DropActions";

const LandingHeader = () => {
  const [isMenuOpen, setOpen] = useState(false);
  const { isMobile } = useMobileDetect();
  const [isBlur, setBlur] = useState(false);

  const handleScroll = () => {
    if (window.scrollY > 50) {
      setBlur(true);
    } else {
      setBlur(false);
    }
  };

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  });

  const renderHeader = () => (
    isMobile ? (
      <header
        className={classNames({
          "LandingHeader": true,
          "LandingHeader-opened": isMenuOpen,
          "LandingHeader-mobile": true,
        })}>
        {isMenuOpen ? (
          <>
            <div className="LandingHeader_control">
              <Link routeName={PAGE_ROUTES.MAIN} onClick={() => setOpen(false)}>
                <div className="LandingHeader_logo">
                  <Logo />
                </div>
              </Link>
              <Burger onClick={() => setOpen(!isMenuOpen)} />
            </div>
            <nav className="LandingHeader_mobile-nav">
              <a
                href="https://t.me/hashbon_chat"
                target="_blank"
                className="LandingHeader_mobile-nav-item"
                rel="noopener noreferrer">
                Telegram community
              </a>
              <a
                href="https://www.reddit.com/r/hashbon/"
                target="_blank"
                className="LandingHeader_mobile-nav-item"
                rel="noopener noreferrer">
                Reddit
              </a>
              <a
                href="https://hashbon.medium.com/"
                target="_blank"
                className="LandingHeader_mobile-nav-item"
                rel="noopener noreferrer">
                Medium
              </a>
              <a
                href="https://rocket.hashbon.com/files/WP_05.08.2021.pdf"
                target="_blank"
                className="LandingHeader_mobile-nav-item"
                rel="noopener noreferrer">
                Whitepaper
              </a>
              <a
                onClick={() => setOpen(false)}
                href="https://rocket.hashbon.com/files/rocket__litepaper_EN.pdf"
                target="_blank"
                className="LandingHeader_mobile-nav-item"
                rel="noreferrer">
                Litepaper
              </a>
              <a
                onClick={() => setOpen(false)}
                href="https://rocket.hashbon.com/files/hashbon_rocket_pitch_deck.pdf"
                target="_blank"
                className="LandingHeader_mobile-nav-item"
                rel="noreferrer">
                Pitch deck
              </a>
              <Link
                onClick={() => setOpen(false)}
                routeName={PAGE_ROUTES.HASHTOKEN}
                className="LandingHeader_mobile-nav-item">
                HASH Token
              </Link>
              <Link
                onClick={() => setOpen(false)}
                routeName={PAGE_ROUTES.ROADMAP}
                className="LandingHeader_mobile-nav-item">
                Roadmap
              </Link>
              <Link
                onClick={() => setOpen(false)}
                routeName={PAGE_ROUTES.CROWDSALE}
                className="LandingHeader_mobile-nav-item">
                Claim Pre-sale Tokens
              </Link>
              <Link
                onClick={() => setOpen(false)}
                routeName={PAGE_ROUTES.WHY_WE_AWESOME}
                className="LandingHeader_mobile-nav-item">
                Why Are We Awesome
              </Link>
              <Link onClick={() => setOpen(false)} routeName={PAGE_ROUTES.FAQ} className="LandingHeader_mobile-nav-item">
                Stake FAQ
              </Link>
              <a
                href="https://hashbon.medium.com/hash-tokenomics-5d636d2eb92"
                target="_blank"
                className="LandingHeader_mobile-nav-item"
                rel="noreferrer">
                Tokenomics
              </a>
              <Link onClick={() => setOpen(false)} routeName={PAGE_ROUTES.TEAM} className="LandingHeader_mobile-nav-item">
                Team
              </Link>
              <a
                href="https://hashbon.gitbook.io/hashbon-rocket/"
                target="_blank"
                className="LandingHeader_mobile-nav-item"
                rel="noreferrer">
                Gitbook
              </a>
              {/* <a */}
              {/*  href="https://rocket.hashbon.com/files/hashbon_rocket_pitch_deck.pdf" */}
              {/*  target="_blank" */}
              {/*  className="LandingHeader_mobile-nav-item" */}
              {/* > */}
              {/*  Pitch Deck */}
              {/* </a> */}
            </nav>
          </>
        ) : (
          <>
            <Link routeName={PAGE_ROUTES.MAIN}>
              <div className="LandingHeader_logo">
                <Logo />
              </div>
            </Link>
            <Button className="LandingHeader_nav__launch-button" onClick={() => router.navigate(PAGE_ROUTES.SWAP)}>
              Launch Dapp
            </Button>
            <Burger onClick={() => setOpen(!isMenuOpen)} />
          </>
        )}
      </header>
    ) : (
      <header className={classNames("LandingHeader-sticky")}>
        <div className={classNames("LandingHeader", { "LandingHeader-blur": isBlur })}>
          <Link routeName={PAGE_ROUTES.MAIN}>
            <div className="LandingHeader_logo">
              <Logo />
            </div>
          </Link>
          <nav className="LandingHeader_nav">
            <Button className="LandingHeader_nav__launch-button" onClick={() => router.navigate(PAGE_ROUTES.SWAP)}>
            Launch Dapp
            </Button>
            <div className="LandingHeader_nav-item">
              <DropActions.Main
                width={180}
                right={410}
                top={80}
                items={[
                  {
                    title: "Telegram",
                    onClick: () => {
                      window.open("https://t.me/hashbon_chat", "_blank");
                    },
                  },
                  {
                    title: "Reddit",
                    onClick: () => {
                      window.open("https://www.reddit.com/r/hashbon/", "_blank");
                    },
                  },
                  {
                    title: "Medium",
                    onClick: () => {
                      window.open("https://hashbon.medium.com/", "_blank");
                    },
                  },
                  {
                    title: "Twitter",
                    onClick: () => {
                      window.open("https://twitter.com/hashbon", "_blank");
                    },
                  },
                  {
                    title: "Bitcointalk",
                    onClick: () => {
                      window.open("https://bitcointalk.org/index.php?topic=5353601", "_blank");
                    },
                  },
                ]}>
                <div className="display_flex cursor_pointer">
                  <div>Community</div>
                  <div style={{ marginLeft: "5px", fontSize: "12px", lineHeight: "23px" }}>▼</div>
                </div>
              </DropActions.Main>
            </div>
            <div className="LandingHeader_nav-item">
              <DropActions.Main
                width={180}
                right={290}
                top={80}
                items={[
                  {
                    title: "Whitepaper",
                    onClick: () => {
                      window.open("https://rocket.hashbon.com/files/WP_05.08.2021.pdf", "_blank");
                    },
                  },
                  {
                    title: "Litepaper",
                    onClick: () => {
                      window.open("https://rocket.hashbon.com/files/rocket__litepaper_EN.pdf", "_blank");
                    },
                  },
                  {
                    title: "Pitch deck",
                    onClick: () => {
                      window.open("https://rocket.hashbon.com/files/hashbon_rocket_pitch_deck.pdf", "_blank");
                    },
                  },
                ]}>
                <div className="display_flex cursor_pointer">
                  <div>whitepaper</div>
                  <div style={{ marginLeft: "5px", fontSize: "12px", lineHeight: "23px" }}>▼</div>
                </div>
              </DropActions.Main>
            </div>
            <Link routeName={PAGE_ROUTES.HASHTOKEN} className="LandingHeader_nav-item">
            HASH Token
            </Link>
            <div className="LandingHeader_nav-item">
              <DropActions.Main
                width={200}
                right={80}
                top={80}
                items={[
                  {
                    title: "Roadmap",
                    onClick: () => {
                      router.navigate(PAGE_ROUTES.ROADMAP);
                    },
                  },
                  {
                    title: "Claim Pre-sale Tokens",
                    onClick: () => {
                      router.navigate(PAGE_ROUTES.CROWDSALE);
                    },
                  },
                  {
                    title: "Why Are We Awesome",
                    onClick: () => {
                      router.navigate(PAGE_ROUTES.WHY_WE_AWESOME);
                    },
                  },
                  {
                    title: "Stake FAQ",
                    onClick: () => {
                      router.navigate(PAGE_ROUTES.FAQ);
                    },
                  },
                  {
                    title: "Tokenomics",
                    onClick: () => {
                      window.open("https://hashbon.medium.com/hash-tokenomics-5d636d2eb92", "_blank");
                    },
                  },
                  {
                    title: "Team",
                    onClick: () => {
                      router.navigate(PAGE_ROUTES.TEAM);
                    },
                  },
                  {
                    title: "Gitbook",
                    onClick: () => {
                      window.open("https://hashbon.gitbook.io/hashbon-rocket/", "_blank");
                    },
                  },
                ]}>
                <div className="display_flex cursor_pointer">
                  <div>about</div>
                  <div style={{ marginLeft: "5px", fontSize: "12px", lineHeight: "23px" }}>▼</div>
                </div>
              </DropActions.Main>
            </div>
          </nav>
        </div>
      </header>
    )
  );

  const renderBanner = () => (
    <div className="HeaderBanner Container" onClick={() => router.navigate(PAGE_ROUTES.EARN)}>
      <div className="HeaderBanner__coins"/>
      <div className="HeaderBanner__container">
        <div className="HeaderBanner__text">
          Stake HASH with a maximum APY of 171.46%
        </div>

        <div
          className="HeaderBanner__button GetHASHButton"
          onClick={() => router.navigate(PAGE_ROUTES.EARN)}>
          <div className="GetHASHButton_wrapper">
            <span>Learn more</span>
          </div>
        </div>


      </div>
    </div>
  );


  return (
    <>
      {renderBanner()}
      {renderHeader()}
    </>
  );
};

export default LandingHeader;
