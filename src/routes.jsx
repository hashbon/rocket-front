/* eslint-disable */
import React from "react";
import { PAGE_ROUTES } from "./definitions";
import NotWrapper from "./pages/wrappers/NotWrapper";
import HeaderWrapper from "./pages/wrappers/HeaderWrapper";
import SwapPage from "./pages/containers/SwapPage";
import OrdersPage from "./pages/containers/OrdersPage";
import OrderPage from "./pages/containers/OrderPage";
import { PageNotFound } from "./pages/containers/NotFoundPage";
import RoadmapPage from "./pages/containers/RoadmapPage";
import LandingHashtokenPage from "./pages/containers/LandingHashtokenPage";
import PoolsPage from "./pages/containers/PoolsPage";
import CreatePoolPage from "./pages/containers/CreatePoolPage";
import EditPoolPage from "./pages/containers/EditPoolPage";
import FAQPage from "./pages/containers/FaqPage";
import StakingReferralFaqPage from "./pages/containers/StakingReferralFaqPage";
import { EarnPage } from "./pages/containers/Earn";
import TeamPage from "./pages/containers/TeamPage";
import LandingWrapper from "./pages/wrappers/LandingOldWrapper";
import CrowdsalePage from "./pages/containers/CrowdsalePage";
import CrowdsaleWrapper from "./pages/wrappers/CrowdsaleWrapper";
import { InstallPluginPage } from "./pages/containers/InstallPluginPage";
import WhyWeAwesomePage from "./pages/containers/WhyWeAwesomePage";
import MainPage from "./pages/containers/MainPage";
import LandingNewWrapper from "./pages/wrappers/LandingNewWrapper";

export default function Routes(props) {
  const routeState = props.router.getState();
  const route = routeState.name;

  let Wrapper = NotWrapper;
  let Component;

  switch (route) {
    case PAGE_ROUTES.MAIN:
      Wrapper = LandingNewWrapper;
      Component = MainPage;
      break;
    case PAGE_ROUTES.ROADMAP:
      Wrapper = LandingWrapper;
      Component = RoadmapPage;
      break;
    case PAGE_ROUTES.HASHTOKEN:
      Wrapper = LandingWrapper;
      Component = LandingHashtokenPage;
      break;
    case PAGE_ROUTES.SWAP:
      Wrapper = HeaderWrapper;
      Component = SwapPage;
      break;
    case PAGE_ROUTES.ORDERS:
      Wrapper = HeaderWrapper;
      Component = OrdersPage;
      break;
    case PAGE_ROUTES.POOLS:
      Wrapper = HeaderWrapper;
      Component = PoolsPage;
      break;
    case PAGE_ROUTES.CREATE_POOL:
      Wrapper = HeaderWrapper;
      Component = CreatePoolPage;
      break;
    case PAGE_ROUTES.EDIT_POOL:
      Wrapper = HeaderWrapper;
      Component = EditPoolPage;
      break;
    case PAGE_ROUTES.ORDER:
      Wrapper = HeaderWrapper;
      Component = OrderPage;
      break;
    case PAGE_ROUTES.NOT_FOUND:
      Wrapper = LandingWrapper;
      Component = PageNotFound;
      break;
    case PAGE_ROUTES.CROWDSALE:
      Wrapper = CrowdsaleWrapper;
      Component = CrowdsalePage;
      break;
    case PAGE_ROUTES.TEAM:
      Wrapper = LandingWrapper;
      Component = TeamPage;
      break;
    case PAGE_ROUTES.FAQ:
      Wrapper = LandingWrapper;
      Component = FAQPage;
      break;
    case PAGE_ROUTES.STAKE_REF_FAQ:
      Wrapper = LandingWrapper;
      Component = StakingReferralFaqPage;
      break;
    case PAGE_ROUTES.EARN:
      Wrapper = HeaderWrapper;
      Component = EarnPage;
      break;
    case PAGE_ROUTES.WHY_WE_AWESOME:
      Wrapper = LandingWrapper;
      Component = WhyWeAwesomePage;
      break;

    case PAGE_ROUTES.INSTALL_PLUGIN:
      Component = InstallPluginPage;
      break;
    default:
      Component = PageNotFound;
      break;
  }

  return !Component ? (
    <div>
      <h1>404 Not Found</h1>
    </div>
  ) : (
    <Wrapper routeState={routeState}>
      <Component routeState={routeState} />
    </Wrapper>
  );
}
