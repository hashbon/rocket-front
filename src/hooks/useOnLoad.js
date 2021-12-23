import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { commonActions } from "../store/actions";

const modulesLoaded = new Set();

export default () => {
  const dispatch = useDispatch();

  const { onloaded } = useSelector((state) => ({
    onloaded: state.common.onloaded,
  }));

  const [counter, setCounter] = useState(0);

  useEffect(() => {
    if (!onloaded) {
      const langs = dispatch(commonActions.getLangs());
      const getTokensAndOffers = dispatch(commonActions.getTokensAndOffers());
      const getBlockChainConfig = dispatch(commonActions.getBlockChainConfig());

      langs.then(() => {
        modulesLoaded.add("langs");
        setCounter(counter + 1);
      });

      getTokensAndOffers.then(() => {
        modulesLoaded.add("getTokensAndOffers");
        setCounter(counter + 1);
      });

      getBlockChainConfig.then(() => {
        modulesLoaded.add("getBlockChainConfig");
        setCounter(counter + 1);
      });
    }
  }, []);

  if (
    !onloaded &&
    modulesLoaded.has("langs") &&
    modulesLoaded.has("getTokensAndOffers") &&
    modulesLoaded.has("getBlockChainConfig")
  ) {
    dispatch(commonActions.setOnLoaded(true));
  }

  return {
    onloaded,
  };
};
