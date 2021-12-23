//

export const lsSet = (key: string, value: string) => {
  try {
    localStorage.setItem(key, value);
  } catch (error) {
    console.error(error);
  }
};

export const lsGet = (key: string) => {
  try {
    return localStorage.getItem(key);
  } catch (error) {
    return null;
  }
};

export const lsRemove = (key: string) => {
  try {
    localStorage.removeItem(key);
  } catch (error) {
    //
  }
};

export const lsClear = () => {
  try {
    localStorage.clear();
  } catch (error) {
    //
  }
};

export default {
  clear: lsClear,
  set: lsSet,
  get: lsGet,
  remove: lsRemove,
};
