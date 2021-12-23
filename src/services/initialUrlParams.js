import * as storage from "./storage";
import { lsGet } from "./storage";

const from = lsGet("from");
// eslint-disable-next-line no-nested-ternary
const initialRefferalParam = from ? (from.length ? from : null) : null;

const savedParams = [];

const initGetParams = ((location) => {
  const params = {};
  const storageParams = {};
  const referralParams = [];
  const search = location.search.slice(1).split("&");

  if (search[0] !== "") {
    search.forEach((param) => {
      const [key, value] = param.split("=");
      params[key] = value;
      if (key.indexOf("utm_") > -1 || key.indexOf("from") > -1) {
        if (!!value && !!value.length) referralParams.push(`${key}=${value}`);
      }
      if (savedParams.includes(key) && value.length > 0) {
        storage.lsSet(key, value);
      }
    });
  }

  savedParams.forEach((key) => {
    const value = storage.lsGet(key);
    if (value) {
      storageParams[key] = value;
    }
  });

  return {
    params: {
      ...storageParams,
      ...params,
      referralParams,
      initialRefferalParam,
    },
    hash: location.hash.slice(1),
  };
})(window.location);

export default initGetParams;
