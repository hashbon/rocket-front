import "./earn.scss";
import React  from "react";
import { useSelector } from "react-redux";
import { StakeItem } from "./components/StakeItem";
import { StakingInterface } from "../../../store/reducers/stake";


export const EarnPage = () => {
  const { list, isStakeInfoLoad } = useSelector((state: any) => state.stake);
  const stakeListArray: StakingInterface[] = [];

  if (isStakeInfoLoad) {
    list.forEach((item: any) => {
      stakeListArray.push(item);
    });
  }
  
  return (
    <div className="EarnPage">
      {stakeListArray.map((item: any) => (<StakeItem key={item.contractAddress} stakeContract={item.contractAddress} />))}
    </div>
  );
};