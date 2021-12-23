import Web3 from "web3";

export const getWeb3NoAccount = () => {
  // fallback on ln
  const provider = Web3.provider && new Web3.provider.HttpProvider("http://127.0.0.1:7545");
  let instance = new Web3(provider);

  // eslint-disable-next-line no-prototype-builtins
  if (window.hasOwnProperty("ethereum")) {
    try {
      instance = new Web3(window.ethereum);
    } catch (error) {
      console.error(error);
    }
    // eslint-disable-next-line no-prototype-builtins
  } else if (window.hasOwnProperty("web3")) {
    instance = new Web3(window.web3);
  }
  return instance;
};

export const web3NoAccount = getWeb3NoAccount();
