export * from "./routes";
export * from "./sizes";
export * from "./loading-statuses";

// Thu, 09 Sep 2021 00:00:00 GMT
// export const LAUNCH_TIME = 1631145600;
export const LAUNCH_TIME = 11; // 1631145600;

export const supportedChainIds = [
  1, // ETH	mainnet - Production
  4, // ETH rinkeby - Test
  56, // BNB Smart Chain - Production
  97, // BNB Smart Chain - Testnet
];

export const modalCustomStyle = {
  content: {
    top: "50%",
    left: "50%",
    right: "auto",
    bottom: "auto",
    marginRight: "-50%",
    padding: 0,
    transform: "translate(-50%, -50%)",
    overlay: { zIndex: 1000 },
    background: "#151721",
    boxShadow: "0 8px 40px rgb(0 0 0 / 8%), 0 0 4px rgb(0 0 0 / 8%), 0 0 1px 0 rgba(255,255,255,0.5)",
    border: "none",
    color: "#fff",
    borderRadius: "20px",
  },
  overlay: {
    backgroundColor: "rgba(0, 0, 0, 0.7)",
    zIndex: 1050,
  },
};
