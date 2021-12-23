import { useSelector } from "react-redux";

export default () => {
  const { tokens } = useSelector((state: any) => ({
    tokens: state.common.tokens,
  }));

  const getTokenById = (_id: number) => tokens.filter(({ id }: any) => id === _id)[0] || false;

  const getTokenByName = (_name: string) =>
    tokens.filter(({ name }: any) => name.toUpperCase() === _name.toUpperCase())[0] || false;

  return {
    tokens,
    getTokenById,
    getTokenByName,
  };
};
