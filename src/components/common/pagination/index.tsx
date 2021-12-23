import "./index.scss";
import React, { FC, useState, useEffect } from "react";
import { IPropsComponent, IMoreButtonProps } from "./assets/interfaces";

const Pagination: FC<IPropsComponent> = (props) => {
  const { children, loadingMore, loadingStatus, hasNext } = props;

  const [state, setState] = useState({
    locked: false,
  });

  const setLockedStatus = (status = true) => {
    setState({
      ...state,
      locked: status,
    });
  };

  const setLocked = () => {
    setLockedStatus();

    setTimeout(() => {
      setLockedStatus(false);
    }, 1000);
  };

  const onScrollHandler = () => {
    if (hasNext) {
      const bottomPoint = window.scrollY + window.innerHeight;
      const scrollHeight = window.innerHeight;
      const needPercent = (scrollHeight / 100) * 95;

      if (bottomPoint > needPercent) {
        if (!state.locked) {
          loadingMore();
          setLocked();
        }
      }
    }
  };

  useEffect(() => {
    window.addEventListener("scroll", onScrollHandler);

    return () => {
      window.removeEventListener("scroll", onScrollHandler);
    };
  });

  return (
    <>
      {children}
      {/* eslint-disable-next-line @typescript-eslint/no-use-before-define */}
      {hasNext && <MoreButton loadingStatus={loadingStatus} onClick={loadingMore} />}
    </>
  );
};

Pagination.defaultProps = {
  loadingMore: () => {},
  loadingStatus: true,
};

const MoreButton: FC<IMoreButtonProps> = ({ loadingStatus, onClick }) => (
  <div onClick={onClick}>
    <div className="pagination__more-button">{loadingStatus ? <span>Загрузка</span> : <span>Больше...</span>}</div>
  </div>
);

MoreButton.defaultProps = {
  onClick: () => {},
};

export default Pagination;
