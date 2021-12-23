import "./index.scss";
import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import ReactPageScroller from "react-page-scroller";
import figure from "./img/mobius_part.png";
import scroll from "./img/scroll.svg";
import useLangs from "../../../hooks/useLangs";
import { commonActions } from "../../../store/actions";

const RoadmapPage = () => {
  const [currentPage, setCurrentPage] = useState(0);

  const { languages } = useLangs();
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(commonActions.getLangs());
  }, []);

  const handlePageChange = (number) => {
    setCurrentPage(() => number);
  };

  return (
    <div className="LandingRoadmapPage">
      <img alt="figure" className="LandingRoadmapPage_figure" src={figure} />
      <div className="LandingRoadmapPage_blur" />
      <img className="LandingRoadmapPage_scroll" src={scroll} alt="scroll" />
      <ReactPageScroller pageOnChange={handlePageChange} customPageNumber={currentPage}>
        <div className="component first-component RoadmapInfoContainer">
          <h2 className="RoadmapInfoContainer_title">{languages["roadmap.now.title"]}</h2>
          <span className="RoadmapInfoContainer_description">
            {languages["roadmap.now.text.0"]}
            <br />
            {languages["roadmap.now.text.1"]}
          </span>
        </div>
        <div className="component second-component RoadmapInfoContainer">
          <h2 className="RoadmapInfoContainer_title">{languages["roadmap.then.title"]}</h2>
          <span className="RoadmapInfoContainer_description">
            {languages["roadmap.then.text.0"]}
            <br />
            {languages["roadmap.then.text.1"]}
          </span>
        </div>
        <div className="component third-component RoadmapInfoContainer">
          <h2 className="RoadmapInfoContainer_title">{languages["roadmap.after.title"]}</h2>
          <span className="RoadmapInfoContainer_description">
            {languages["roadmap.after.text.0"]}
            <br />
            {languages["roadmap.after.text.1"]}
            <br />
            {languages["roadmap.after.text.2"]}
          </span>
        </div>
      </ReactPageScroller>
    </div>
  );
};

export default RoadmapPage;
