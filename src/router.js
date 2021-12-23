import createRouter from "router5";
import browserPlugin from "router5-plugin-browser";
import listenersPlugin from "router5-plugin-listeners";
import { PAGE_ROUTES } from "./definitions";
import { canActivateByInstalledPlugin } from "./guards/plugin-installed";

export const routes = [
  {
    name: PAGE_ROUTES.MAIN,
    path: "/",
  },
  {
    name: PAGE_ROUTES.EARN,
    path: "/stake",
  },
  {
    name: PAGE_ROUTES.LANDING_NEW,
    path: "/new-landing",
  },
  {
    name: PAGE_ROUTES.ROADMAP,
    path: "/roadmap",
  },
  {
    name: PAGE_ROUTES.HASHTOKEN,
    path: "/hashtoken",
  },
  {
    name: PAGE_ROUTES.CROWDSALE,
    path: "/sale",
  },
  {
    name: PAGE_ROUTES.NOT_FOUND,
    path: "/not_found",
  },
  {
    name: PAGE_ROUTES.FAQ,
    path: "/stake-faq",
  },
  {
    name: PAGE_ROUTES.STAKE_REF_FAQ,
    path: "/stake-ref-faq",
  },
  {
    name: PAGE_ROUTES.WHY_WE_AWESOME,
    path: "/why-we-awesome",
  },
  {
    name: PAGE_ROUTES.TEAM,
    path: "/team",
  },
  {
    name: PAGE_ROUTES.SWAP,
    path: "/swap",
  },
  {
    name: PAGE_ROUTES.POOLS,
    path: "/pools",
  },
  {
    name: PAGE_ROUTES.CREATE_POOL,
    path: "/pools/create",
  },
  {
    name: PAGE_ROUTES.EDIT_POOL,
    path: "/pools/:id",
  },
  {
    name: PAGE_ROUTES.ORDERS,
    path: "/orders",
  },
  {
    name: PAGE_ROUTES.ORDER,
    path: "/orders/:id",
  },
  {
    name: PAGE_ROUTES.INSTALL_PLUGIN,
    path: "/install_plugin",
  },
];

const params = {
  defaultRoute: PAGE_ROUTES.NOT_FOUND,
  defaultParams: {},
  strictQueryParams: true,
  trailingSlash: true,
  useTrailingSlash: false,
  queryParamsMode: "loose",
};

const router = createRouter(routes, params);

router.usePlugin(
  browserPlugin({
    base: "",
    useHash: false,
    hashPrefix: "",
    mergeState: true,
    preserveHash: false,
    forceDeactivate: true,
  }),
);

router.usePlugin(listenersPlugin());

[
  PAGE_ROUTES.SWAP,
  PAGE_ROUTES.POOLS,
  PAGE_ROUTES.CREATE_POOL,
  PAGE_ROUTES.EDIT_POOL,
  PAGE_ROUTES.ORDERS,
  PAGE_ROUTES.ORDER,
].forEach((route) => {
  router.canActivate(route, canActivateByInstalledPlugin);
});
export default router;
