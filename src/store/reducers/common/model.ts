export interface BlockChainConfig {
  [key: string]: Net;
}

interface Net {
  contractAddress: string;
  saleContractAddress: string;
  name: string;
  address: string;
  currencySymbol: string;
  explorerUrl: string;
}
