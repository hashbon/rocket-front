import "./index.scss";
import React, { useEffect, useRef, useState } from "react";
import { useSpring, animated } from "react-spring";
import Typewriter from "typewriter-effect";
import neon_list from "./img/icons/neon_list.svg";
import neon_logo from "./img/icons/neon_logo.svg";
import neon_volume from "./img/icons/neon_volume.svg";
import router5 from "../../../../../router";
import { PAGE_ROUTES } from "../../../../../definitions";

const calc = (x: number, y: number) => [x - window.innerWidth / 2, y - window.innerHeight / 2];
const trans1 = (x: number, y: number) => `translate3d(${-x / 14}px,${-y / 14}px,0)`;
const trans2 = (x: number, y: number) => `translate3d(${x / 10 + 35}px,${y / 10 - 50}px,0)`;

const Astronaut: React.FC = () => {
  const [data, set] = useSpring(() => ({ xy: [0, 0], config: { mass: 100, tension: 550, friction: 240 } }));
  const inputRef = useRef();
  const [isShowLink, setIsShowLink] = useState(false);
  const [showText, setShowText] = useState(false);
  const handleScroll = () => {
    if (inputRef.current !== undefined) {
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore
      const posY = inputRef.current.getBoundingClientRect().top;
      if (posY < 200 && !showText) {
        setShowText(true);
      }
    }
  };

  useEffect(() => {
    handleScroll();
    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  });

  return (
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    <div ref={inputRef} className="Astronaut" onMouseMove={({ clientX: x, clientY: y }) => set({ xy: calc(x, y) })}>
      <animated.div className="Astronaut__bg-stars" style={{ transform: data.xy.interpolate(trans1) }} />
      <div className="Astronaut__bg-galaxy" />
      <div className="Astronaut__container">
        <animated.div className="Astronaut__bg-main" style={{ transform: data.xy.interpolate(trans2) }} />
        <div className="Astronaut__tablet__container">
          <div className="Astronaut__tablet">
            <div className="Astronaut__tablet-inside">
              <div className="Astronaut__tablet-text">
                {showText && !isShowLink && (
                  <Typewriter
                    onInit={(typewriter) => {
                      typewriter
                        .typeString("HASH Token is the fuel for the Hashbon Rocket")
                        .typeString("<br/><br/>")
                        .typeString("HASH allows:<br/>")
                        .typeString(" &mdash; liquidity providers to make swaps paying fees to arbiters,<br/>")
                        .typeString(" &mdash;  arbiters to approve transactions and get a voting power.<br/>")
                        .typeString(
                          "Further, HASH will be designed to issue DeFi bonds and launch crowdsales.<br/><br/>",
                        )
                        .callFunction(() => {
                          setIsShowLink(true);
                        })
                        .start();
                    }}
                    options={{
                      delay: 30,
                    }}
                  />
                )}

                {isShowLink && (
                  <>
                    HASH Token is the fuel for the Hashbon Rocket
                    <br />
                    <br />
                    HASH allows:
                    <br />
                    <ul>
                      <li>&nbsp;&mdash;&nbsp; liquidity providers to make swaps paying fees to arbiters,</li>
                      <li>&nbsp;&mdash;&nbsp; arbiters to approve transactions and get a voting power.</li>
                    </ul>
                    Further, HASH will be designed to issue DeFi bonds and launch crowdsales.
                    <br />
                    <br />
                    <button
                      className="Astronaut__tablet-text_link"
                      onClick={() => {
                        router5.navigate(PAGE_ROUTES.HASHTOKEN);
                      }}>
                      <b>Read more about HASH Token</b>
                    </button>
                  </>
                )}
              </div>
              <div className="Astronaut__tablet-icons">
                <img src={neon_logo} alt="" width={45} />
                <img src={neon_list} alt="" width={45} />
                <img src={neon_volume} alt="" width={55} />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Astronaut;
