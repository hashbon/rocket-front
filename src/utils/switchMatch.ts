export const switchMatch = (key: string, node: any) => {
  const DEFAULT_CASE = "default";
  switch (typeof node) {
    case "object": {
      switch (typeof key) {
        case "boolean":
          return node[key];
        default:
        case "string": {
          if (key in node) {
            switch (typeof node[key]) {
              case "function": {
                return node[key]();
              }
              default:
                return node[key];
            }
          } else if (DEFAULT_CASE in node) {
            switch (typeof node[DEFAULT_CASE]) {
              case "function": {
                return node[DEFAULT_CASE]();
              }
              default:
                return node[DEFAULT_CASE];
            }
          } else {
            return key;
          }
        }
      }
    }
    default:
      break;
  }
  return false;
};
