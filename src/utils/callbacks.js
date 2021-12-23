const callbacks = {
  scope: new Map(),
  getKey: (prefix = "") => {
    const chars = [..."ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789"];
    // eslint-disable-next-line no-bitwise,@typescript-eslint/no-unused-vars
    return prefix + [...Array(16)].map((i) => chars[(Math.random() * chars.length) | 0]).join``;
  },
  add: (prefix = "", func) => {
    const key = callbacks.getKey(prefix);
    callbacks.scope.set(key, func);
    return key;
  },
  get: (key) => callbacks.scope.get(key),
  remove: (key) => callbacks.scope.delete(key),
  clear: () => {
    callbacks.scope.clear();
  },
};

export default callbacks;
