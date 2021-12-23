import "./index.scss";
import React from "react";
import { v4 as uuidv4 } from "uuid";
import { PersonPhoto } from "./components";

export const Person : React.FC<{ name: string; description: string; photo: string }> = (props) => {
  const { photo, description, name } = props;
  return (
    <div className="Person" key={uuidv4()}>
      <PersonPhoto photo={photo} />
      <div className="Person_name">{name}</div>
      <div className="Person_description">{description}</div>
    </div>
  );
};

export default Person;
