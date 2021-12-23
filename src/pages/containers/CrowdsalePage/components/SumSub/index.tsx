import React, { useEffect, useState } from "react";
import snsWebSdk from "@sumsub/websdk";
import { useDispatch } from "react-redux";
import { userActions } from "../../../../../store/actions";
import useInvestorAuth from "../../../../../hooks/useInvestorAuth";


const SumSub = () => {
  const dispatch = useDispatch();
  const { isAuth } = useInvestorAuth();
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    if (isAuth) {
      dispatch(userActions.getSumsub((resp: any) => {
        setLoaded(true);
        let snsWebSdkInstance = snsWebSdk.init(
          resp.data.accessToken,
          // token update callback, must return Promise
          // Access token expired
          // get a new one and pass it to the callback to re-initiate the WebSDK
          () => new Promise((resolve) => {
            dispatch(userActions.getSumsub((response: any) => {
              if (response.type === "success") {
                resolve(response.data.accessToken);
              }
            }));
          }),
        )
          .withConf({
            uiConf: {
              customCssStr: ":root {" +
                "--success-color:#00CBE3;" +
                "--orange-color: #A253FA;" +
                "--red-color: #00CBE3;" +
                "}" +
                ".step .title {" +
                "color: #fff;" +
                "}" +
                ".step.active .title {" +
                "color: #3794DB;" +
                "}" +
                "#loader .round-icon, .round-icon {" +
                "background-image:linear-gradient(45deg, #A253FA 0%, #00CBE3 100%);" +
                "}" +
                "section.content {" +
                "border-radius:25px;" +
                "}" +
                "#loader, .loader-overlay {" +
                "background: transparent;" +
                "}" +
                "@media (max-width: 480px) {" +
                "body {" +
                "background: transparent;" +
                "}" +
                "}\n",
            },
          })
          .onMessage((type: any, payload: any) => {
            console.warn("WebSDK onMessage", type, payload);
            if (payload.reviewResult) {
              if (payload.reviewResult.reviewAnswer === "GREEN") {
                // all is OK
              } else if (payload.reviewResult.reviewRejectType === "FINAL") {
                // review rejected
              }
            }
          })
          .on("idCheck.onError", (error: any) => {
            console.error("WebSDK onError", error);
          });

        if (resp.data.isTest) {
          snsWebSdkInstance = snsWebSdkInstance.onTestEnv();
        }
        const resultSnsWebSdkInstance = snsWebSdkInstance.build();

        resultSnsWebSdkInstance.launch("#sumsub");
      }));
    }
  }, []);




  return (
    <>
      {loaded && <div id="sumsub"/>}
    </>
  );
};

export default SumSub;