import { useDispatch, useSelector } from "react-redux";
import { useWeb3React } from "@web3-react/core";
import { useEffect, useState } from "react";
import { userActions } from "../store/actions";

const useInvestorAuth = () => {
  const { isAuth, user, token } = useSelector((state: any) => state.user);
  const { account } = useWeb3React();
  const dispatch = useDispatch();
  const [locked, setLocked] = useState(false);
  let interval: ReturnType<typeof setInterval>;
  useEffect(() => {
    if (!isAuth && token) {
      dispatch(userActions.getUserInfo());
    }
  }, []);
  const { investorAddresses, verified } = user;

  const checkAddressExists = (address: string) =>
    Boolean(investorAddresses.find((obj: any) => obj.address.toLowerCase() === address.toLowerCase()));
  // Добавляем новый адрес пользователю
  useEffect(() => {
    if (!locked && account && investorAddresses != null && !checkAddressExists(account)) {
      setLocked(true);
      dispatch(userActions.addInvestorAddress(account));
    }

    return () => {
      setLocked(false);
    };
  }, [account, user]);

  // Если пользователь авторизован, выполняем получение информации о нем каждые 10 сек
  const fetchUser = () => {
    dispatch(userActions.getUserInfo());
  };

  useEffect(() => {
    if (isAuth) {
      fetchUser();
      interval = setInterval(fetchUser, 10 * 1000);
    }
    return () => {
      if (interval) {
        clearInterval(interval);
      }
    };
  }, [isAuth]);

  return {
    isAuth,
    verified: verified || false,
    user,
  };
};

export default useInvestorAuth;
