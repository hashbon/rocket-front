/* eslint-disable */
import "./static/styles/index.scss";
import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import Routes from "./routes";
import router from "./router";
import * as themes from "./services/themes";
import { isMobile, isAdaptive } from "./utils";
import { lsGet, lsSet, ParamsContext } from "./services";
import initialUrlParams from "./services/initialUrlParams";
import * as Modals from "./components/ui/universal/Modals";
import ConnectModal from "./modals/Connect";
import InstallModal from "./modals/Install";
import WaitingResultModal from "./modals/WaitingResult";
import SwitchChainModal from "./modals/SwitchChain";
import SelectToken from "./modals/SelectToken";
import NotSupportChainModal from "./modals/NotSupportChain";
import { SIZES } from "./definitions";
import Web3ReactManager from "./services/web3network/components/Web3ReactManager";
import * as api from "./services/api";
// import ReactGA from "react-ga";

const LIGHT = "app_light";
const DARK = "app_dark";
const IS_MOBILE_CLASSNAME = "mobile";
const IS_ADAPTIVE_CLASSNAME = "adaptive";
const REFERRAL_DIVIDER = ";";

const getRefferalLinkId = (link, callback) => {
  try {
    api
      .post("get-referral-link-id", { link })
      .then(callback)
      .catch(() => {
      });
  } catch (e) {
    //
  }
};

let referrals = [];
const referralsLS = lsGet("referrals");
if (!!referralsLS && referralsLS.length > 0) {
  const arrayFromReferralsLS = referralsLS.split(";");
  if (arrayFromReferralsLS.length > 10) {
  } else {
    referrals = [...referrals, ...arrayFromReferralsLS];
  }
}

let referralsFromURL = [];
const locationSearch = location.search;
if (!!locationSearch.length) {
  if (
    locationSearch.indexOf("utm_") > -1 ||
    (locationSearch.indexOf("from") > -1 && initialUrlParams.params.referralParams.length > 0)
  ) {
    referralsFromURL = [...referralsFromURL, initialUrlParams.params.referralParams.join("&")];
    if (!!referralsFromURL && !!referralsFromURL.length) {
      if (!referrals.includes(referralsFromURL[0])) {
        referrals = [...referrals, ...referralsFromURL];
      }
    }
  }
  if (initialUrlParams.params["ref"] && /*!lsGet("partner") &&*/ initialUrlParams.params["ref"].match(/^0x[0-9a-fA-F]{40}$/)) {
    lsSet("partner", initialUrlParams.params["ref"]);
  }
}

let referralBuildAllowed = false;
if (!!referralsLS && referralsLS.length > 0) {
  if (referrals.join(REFERRAL_DIVIDER) !== referralsLS) {
    referralBuildAllowed = true;
  }
} else if (referrals.length > 0) {
  referralBuildAllowed = true;
}

if (referralBuildAllowed) {
  getRefferalLinkId(referrals.join(REFERRAL_DIVIDER), (response) => {
    if (response.hasOwnProperty("type")) {
      if (response.type === "success") {
        lsSet("from_id", response.id);
        lsSet("referrals", referrals.join(REFERRAL_DIVIDER));
      }
    }
  });
}

console.error = (function() {
  let error = console.error;
  return function(exception) {
    if ((exception + "").indexOf("Warning: A component is `contentEditable`") !== 0) {
      error.apply(console, arguments);
    }
    if ((exception + "").indexOf("React Hook useEffect has a missing dependency`") !== 0) {
      error.apply(console, arguments);
    }
  };
})();

function pageView(state) {
  const { gtag } = window;
  if (typeof gtag === "function") {
    gtag("config", "G-6016Y08P5E", {
      page_title: state.name,
      page_location: window.location.pathname + window.location.search,
      page_path: state.path,
    });
  }
}

export const App = (props) => {
  const [isLoaded, setIsLoaded] = useState(false);
  const [isMobileVersion, setIsMobileVersion] = useState(false);
  const [isAdaptiveVersion, setIsAdaptiveVersion] = useState(false);
  const [route, setRoute] = useState(undefined);

  const __routerListenerHandler = (state, prevState) => {
    pageView(state);
    setRoute(state)
  };

  const handleResize = () => {
    const w = window.innerWidth;
    const mobile = isMobile();
    const adaptive = isAdaptive();

    if (w <= SIZES.MOBILE.MAX) {
      if (!mobile) {
        document.body.classList.add(IS_MOBILE_CLASSNAME);
        setIsMobileVersion(true);
      }
    } else if (mobile) {
      document.body.classList.remove(IS_MOBILE_CLASSNAME);
      setIsMobileVersion(false);
    }

    if (w <= SIZES.ADAPTIVE.MAX) {
      if (!adaptive) {
        document.body.classList.add(IS_ADAPTIVE_CLASSNAME);
        setIsAdaptiveVersion(true);
      }
    } else if (adaptive) {
      document.body.classList.remove(IS_ADAPTIVE_CLASSNAME);
      setIsAdaptiveVersion(false);
    }
  };

  const loadAssets = () => {
    if (!themes.themeIsInited()) {
      themes.setTheme(LIGHT);
    } else {
      themes.themeInit();
    }

    if (navigator.platform.match("Mac") !== null) {
      document.body.classList.add("OSX");
    } else if (navigator.platform.match("Linux") !== null) {
      document.body.classList.add("LINUX");
    }

    setIsLoaded(true);
  };


  useEffect(() => {
    pageView(router.getState());
    loadAssets();
    handleResize();
    router.addListener(__routerListenerHandler);
    window.addEventListener("resize", handleResize);

    return () => {
      router.removeListener(__routerListenerHandler);
      window.removeEventListener("resize", handleResize);
    }
  }, [])

  return !isLoaded ? (
    <div>Loading...</div>
  ) : (
    <>
      <ParamsContext.Provider
        value={{
          ...initialUrlParams,
          isMobile: isMobileVersion,
          isAdaptive: isAdaptiveVersion,
        }}>
        <Web3ReactManager>
          <Modals.Router
            modalsRoutes={{
              connect: ConnectModal,
              chain: SwitchChainModal,
              selectToken: SelectToken,
              install: InstallModal,
              notSupportChain: NotSupportChainModal,
              waitingResult: WaitingResultModal,
            }}
          />
          <Routes router={route !== undefined ? route : {}} {...props} />
        </Web3ReactManager>
      </ParamsContext.Provider>
    </>
  );
};

