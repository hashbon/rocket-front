export const trimAccount = (account: string | null = "") => {
  if (account) {
    return `${account.substr(0, 6)}...${account.substr(38, 4)}`;
  }
  return "";
};
