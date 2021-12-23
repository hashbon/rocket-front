import cogoToast from "cogo-toast";

type Web3UserError = {
  code: number,
  heading: string,
  message: string
};

type Web3ErrorsList = {
  [index: string] : Web3UserError
};

const errorsList: Web3ErrorsList = {
  "4001": { code: 4001, heading: "Handle Error", message: "You denied transaction signature." },
  "-32603": { code: -32603, heading: "Transfer Error", message: "Transfer from failed" },
};

const getError = (error: any) => error.error || error;

export const errorHandler = (error: any) => {
  const currentError = getError(error);
  const web3ErrorMapper = errorsList[String(currentError.code)];

  console.error("Web3ErrorsHandler", currentError);
  if (web3ErrorMapper) {
    return cogoToast.error(web3ErrorMapper.message, { position: "top-right", heading: web3ErrorMapper.heading, hideAfter: 10 });
  }
  return cogoToast.error("Please try again.", { position: "top-right", heading: "Something went wrong!", hideAfter: 10 });
};