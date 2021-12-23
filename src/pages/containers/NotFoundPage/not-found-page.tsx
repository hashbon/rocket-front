import "./not-found-page.scss";
import React from "react";
import BackgroundImage404 from "./assets/colourful-night-sky-with-nebula-star-field.png";
import Figure from "./assets/figure.png";
import Button from "../../../components/ui/universal/Button";
import router5 from "../../../router";
import { PAGE_ROUTES } from "../../../definitions";

export const PageNotFound = () => (
  <div className="PageNotFound" style={{ backgroundImage: `url(${BackgroundImage404})` }}>
    <div className="PageNotFound_wrapper">
      <div className="PageNotFound_wrapper_whoops">
        <div className="PageNotFound_wrapper_whoops_header">
          <span>404</span>
        </div>
        <div className="PageNotFound_wrapper_whoops_text">
          <h1>Whoops!</h1>
          <h6>
            The page you are looking for was moved,
            <br />
            removed, renamed ore might never existed!
          </h6>
        </div>
      </div>
      <div className="PageNotFound_buttons">
        <div className="PageNotFound_linkButtons">
          <div className="PageNotFound_linkButtons-button">
            <Button
              size="hyper"
              mode="outline_gray"
              onClick={() => {
                router5.navigate(PAGE_ROUTES.MAIN);
              }}>
              <div className="display_flex">
                <div>Main</div>
              </div>
            </Button>
          </div>

          <div className="PageNotFound_linkButtons-button">
            <Button
              size="hyper"
              mode="outline_gray"
              onClick={() => {
                window.open("https://hashbon.medium.com/hash-tokenomics-5d636d2eb92", "_blank");
              }}>
              <div className="display_flex">
                <div>Tokenomics</div>
              </div>
            </Button>
          </div>
          <div className="PageNotFound_linkButtons-button">
            <Button
              size="hyper"
              mode="outline_gray"
              onClick={() => {
                router5.navigate(PAGE_ROUTES.ROADMAP);
              }}>
              <div className="display_flex">
                <div>Roadmap</div>
              </div>
            </Button>
          </div>
        </div>
      </div>
      <div className="PageNotFound_wrapper_figure" style={{ backgroundImage: `url(${Figure})` }} />
    </div>
  </div>
);
