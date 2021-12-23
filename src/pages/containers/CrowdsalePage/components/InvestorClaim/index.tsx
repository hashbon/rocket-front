import "./index.scss";
import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { userActions } from "../../../../../store/actions";
import Button from "../../../../../components/ui/universal/Button";
import useInvestorAuth from "../../../../../hooks/useInvestorAuth";
import SumSub from "../SumSub";

import Input from "../../../../../components/ui/universal/Input";
import ClaimTokens from "../ClaimTokens";

const InvestorClaim = () => {
  const dispatch = useDispatch();
  const [credentials, setCredentials] = useState({ email: "", password: "" });
  const { isAuth, verified, user } = useInvestorAuth();

  const register = () => {
    dispatch(userActions.register(credentials.email, credentials.password));
  };

  const login = () => {
    dispatch(userActions.login(credentials.email, credentials.password));
  };

  const logout = () => {
    dispatch(userActions.logout());
  };

  const renderLoginFrom = () => (
    <>
      <div className="InvestorClaim__description">To claim your HASH Tokens you need to sign up or log in.</div>
      <div className="InvestorClaim__fields">
        <div className="InvestorClaim__fields--item">
          <Input
            type="email"
            name="amount"
            mode="primary"
            title=""
            placeholder="email"
            value={`${credentials.email}`}
            onChangeHandler={(e) => {
              setCredentials({
                ...credentials,
                email: e.toString(),
              });
            }}
          />
        </div>
        <div className="InvestorClaim__fields--item">
          <Input
            type="password"
            name="amount"
            mode="primary"
            title=""
            placeholder="password"
            value={`${credentials.password}`}
            onChangeHandler={(e) => {
              setCredentials({
                ...credentials,
                password: e.toString(),
              });
            }}
          />
        </div>
      </div>
      <div className="InvestorClaim__buttons">
        <Button
          className="InvestorClaim__buttons--item InvestorClaim__buttons--item_outline"
          onClick={register}
          size="large">
          Sign up
        </Button>
        <Button className="InvestorClaim__buttons--item" onClick={login} size="large">
          Log in
        </Button>
      </div>
    </>
  );

  const renderVerificationForm = () => (
    <div className="InvestorClaim__verify">
      <div className="InvestorClaim__description">You have not passed KYC yet, please go through it.</div>
      <SumSub />
    </div>
  );

  const renderUserPage = (email: string) => (
    <>
      <div>{email}</div>
      <div className="InvestorClaim__buttons--logout">
        <Button className="InvestorClaim__buttons--item" onClick={logout}>
          Log out
        </Button>
      </div>
      {verified ? <ClaimTokens /> : renderVerificationForm()}
    </>
  );
  return (
    <div className="InvestorClaim">
      {!isAuth ? renderLoginFrom() : renderUserPage(user.email)}
      <br />
    </div>
  );
};

export default InvestorClaim;
