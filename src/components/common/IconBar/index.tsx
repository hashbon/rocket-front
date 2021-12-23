import "./index.scss";
import React from "react";
import { IconBarIcons } from "./interface";


const IconBar = (props: IconBarIcons) => {
  let i = 1;
  return (
    <div className="IconBar">
      {props.icons.map((icon: any) => {
        i += 1;
        return (
          icon.isNotLink ?
            (
              <div key={i} className="IconBar__item">
                <img alt={icon.alt} src={icon.image} />
              </div>
    
            ) : (
              <a key={i} href={icon.link} target="_blank" className="IconBar__item" rel="noopener noreferrer">
                <img alt={icon.alt} src={icon.image} />
              </a>
            )
        );
      },
      )}
    </div>
  );
};

export default IconBar;