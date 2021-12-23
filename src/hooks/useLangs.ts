import { useSelector } from "react-redux";

export default () => {
  const { langs } = useSelector((state: any) => ({
    langs: state.common.langs,
  }));

  return {
    languages: langs,
    getLang: (k: string) => {
      if (langs === undefined || Object.keys(langs).length === 0) {
        return "?";
      }
      return k in langs ? langs[k] : "?";
    },
  };
};
