import "./index.scss";
import React from "react";
import { switchMatch } from "../../../../utils/index";
import { ReactComponent as BackSVG } from "./assets/svg/back.svg";
import { ReactComponent as HomeSVG } from "./assets/svg/home.svg";
import { ReactComponent as CloseSVG } from "./assets/svg/close.svg";
import { ReactComponent as PlusSVG } from "./assets/svg/plus.svg";
import { ReactComponent as MenuSVG } from "./assets/svg/menu.svg";
import { ReactComponent as OkSVG } from "./assets/svg/ok.svg";
import { ReactComponent as EditSVG } from "./assets/svg/edit.svg";
import { ReactComponent as SettingsSVG } from "./assets/svg/settings.svg";
import { ReactComponent as ProfileSVG } from "./assets/svg/profile.svg";
import { ReactComponent as MinCancel } from "./assets/svg/16_cancel.svg";
import { ReactComponent as MinDown } from "./assets/svg/16_down.svg";
import { ReactComponent as Place } from "./assets/svg/place.svg";

const HeaderIcon = (props) => {
  const { typeIcon } = props;

  return (
    <div className="header--icon">
      <div className="header--icon_icon">
        {switchMatch(typeIcon, {
          back: <BackSVG />,
          home: <HomeSVG />,
          close: <CloseSVG />,
          plus: <PlusSVG />,
          menu: <MenuSVG />,
          ok: <OkSVG />,
          edit: <EditSVG />,
          settings: <SettingsSVG />,
          profile: <ProfileSVG />,
          min_cancel: <MinCancel />,
          min_down: <MinDown />,
          place: <Place />,
        })}
      </div>
    </div>
  );
};

export default HeaderIcon;
