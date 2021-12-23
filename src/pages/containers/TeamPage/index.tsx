import "./index.scss";
import React, { useEffect } from "react";
import Spacer from "../../../components/ui/universal/Spacer";
import { Person } from "../../../components/common/Person";
import image1 from "./images/1.png";
import image2 from "./images/2.png";
import image3 from "./images/3.png";
import image4 from "./images/4.png";
import image5 from "./images/5.png";
import image6 from "./images/6.png";
import image7 from "./images/7.png";
import image8 from "./images/8.png";
import image9 from "./images/9.png";
import image10 from "./images/10.jpg";
import image11 from "./images/11.jpeg";
import image12 from "./images/12.jpeg";
import image13 from "./images/13.jpeg";

const persons = [
  {
    name: "Grigory B.",
    description: "Founder & CEO",
    photo: image1,
  },
  {
    name: "Iuliia B.",
    description: "Founder & GR manager",
    photo: image10,
  },
  {
    name: "Ann Kh.",
    description: "Deputy CEO",
    photo: image2,
  },
  {
    name: "Yuri G.",
    description: "COO",
    photo: image13,
  },
  {
    name: "Sam S.",
    description: "CTO",
    photo: image3,
  },
  {
    name: "Leo L.",
    description: "CPO",
    photo: image4,
  },
  {
    name: "Andrew S.",
    description: "Head of Business Development",
    photo: image5,
  },
  {
    name: "Oxy S.",
    description: "CCO",
    photo: image6,
  },
  {
    name: "Ann Ch.",
    description: "Social Media Manager",
    photo: image7,
  },
  {
    name: "Artur K.",
    description: "Bounty Manager",
    photo: image8,
  },
  {
    name: "Andrew D.",
    description: "Project Manager",
    photo: image9,
  },
  {
    name: "Anna B.",
    description: "Community manager",
    photo: image12,
  },
  {
    name: "Fadi A.",
    description: "PR Manager",
    photo: image11,
  },
];

const Page = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  return (
    <div className="TeamPage_back">
      <div className="TeamPage">
        <div className="TeamPage_wrapper">
          <div className="TeamPage_wrapper_title">
            <span>The Team</span>
          </div>
          <Spacer size={6} />
          <div className="TeamPage_items">
            {[...persons].map(({ name, description, photo }, i) => <Person name={name} description={description} photo={photo} key={i}/>)}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Page;
