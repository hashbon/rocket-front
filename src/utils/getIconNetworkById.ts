import { ReactComponent as BEP } from "../static/images/svg/bep.svg";
import { ReactComponent as ERC } from "../static/images/svg/erc.svg";
import { switchMatch } from "./switchMatch";

export const getIconNetworkById = (id: number) =>
  switchMatch((id || "").toString(), {
    "4": ERC,
    "97": BEP,
    "56": BEP,
    "1": ERC,
  });
