export {};

declare global {
  interface Window {
    ethereum?: {
      isMetaMask?: boolean;
      request: any;
    };
    dataLayer?: Array;
    gtag?: any;
  }
}
