import "../index.scss";
import React from "react";

export const PersonPhoto : React.FC<{ photo: string }> = ({ photo }) => <div className="Person_photo" style={{ backgroundImage: `url(${photo})` }} />;

export default PersonPhoto;
