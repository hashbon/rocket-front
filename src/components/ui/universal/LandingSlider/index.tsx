// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-nocheck
import "../../../../static/styles/slick.scss";
import React from "react";
import ItemsCarousel from "react-slick";
import "./index.scss";
import { useMobileDetect } from "../../../../hooks/useMobileDetect";
import IconUniversal from "../IconUniversal";

interface IComponentProps {
  title: string;
  partners: Array<IParnter>;
}

interface IParnter {
  alt: string;
  img: string;
  link: string;
}

function NextArrow(props) {
  const { style, onClick } = props;
  return (
    <div className="LandingSlider_icon" style={{ ...style, right: 30 }} onClick={onClick}>
      <IconUniversal typeIcon="right" size="40px" />
    </div>
  );
}

function PrevArrow(props) {
  const { style, onClick } = props;
  return (
    <div className="LandingSlider_icon" style={{ ...style, left: 30 }} onClick={onClick}>
      <IconUniversal typeIcon="left" size="40px" />
    </div>
  );
}

const LandingSlider: React.FC<IComponentProps> = ({ title, partners }) => {
  const { isMobile } = useMobileDetect();

  const settings = !isMobile
    ? {
      className: "slider variable-width",
      dots: true,
      infinite: true,
      centerMode: false,
      slidesToShow: 1,
      slidesToScroll: 1,
      variableWidth: true,
    }
    : {
      dots: true,
      infinite: true,
      speed: 500,
      centerMode: true,
      slidesToShow: 1,
      slidesToScroll: 1,
    };

  settings.nextArrow = <NextArrow />;
  settings.prevArrow = <PrevArrow />;

  return (
    <div className="LandingSlider">
      <div className="LandingSlider_control">
        <h3 className="LandingSlider_title">{title}</h3>
        <div className="LandingSlider_partners">
          <ItemsCarousel {...settings}>
            {partners.map((partner, i) => (
              // eslint-disable-next-line react/jsx-key
              <div key={i}>
                <a className="item" rel="noopener noreferrer" target="_blank" href={partner.link}>
                  <img src={partner.img} alt={partner.alt} />
                </a>
              </div>
            ))}
          </ItemsCarousel>
        </div>
      </div>
    </div>
  );
};

export default LandingSlider;
