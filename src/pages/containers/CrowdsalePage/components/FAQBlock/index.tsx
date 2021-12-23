import "./index.scss";
import React from "react";
import router5 from "../../../../../router";
import { PAGE_ROUTES } from "../../../../../definitions";

// eslint-disable-next-line react/display-name
export default () => (
  <div className="FAQBlock">
    <div className="FAQBlock_wrapper">
      <div className="FAQBlock_wrapper_content" onClick={() => router5.navigate(PAGE_ROUTES.FAQ)}>
        <div>
          Check out our <span>FAQ</span>
        </div>
        <div>to get more info</div>
      </div>
    </div>
  </div>
);
