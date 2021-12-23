import * as storage from "./storage";

const LIGHT = "app_light";
const DARK = "app_dark";
const STORAGE_THEME = "app_theme";

export function themeInit() {
  const storageTheme = storage.lsGet(STORAGE_THEME);
  if (storageTheme === LIGHT || storageTheme === DARK) {
    // eslint-disable-next-line @typescript-eslint/no-use-before-define
    setTheme(storageTheme);
  }
}

export function themeIsInited() {
  const storageTheme = storage.lsGet(STORAGE_THEME);
  return storageTheme === LIGHT || storageTheme === DARK;
}

export function getTheme() {
  const storageTheme = storage.lsGet(STORAGE_THEME);
  if (storageTheme === LIGHT || storageTheme === DARK) {
    return storageTheme;
  }
  return LIGHT;
}

export function themeIsDark() {
  return getTheme() === DARK;
}

export function setTheme(theme: "app_light" | "app_dark") {
  switch (theme) {
    default:
    case LIGHT:
      if (document.body.classList.contains(DARK)) {
        document.body.classList.remove(DARK);
      }
      if (!document.body.classList.contains(LIGHT)) {
        document.body.classList.add(LIGHT);
      }
      storage.lsSet(STORAGE_THEME, LIGHT);
      break;
    case DARK:
      if (document.body.classList.contains(LIGHT)) {
        document.body.classList.remove(LIGHT);
      }
      if (!document.body.classList.contains(DARK)) {
        document.body.classList.add(DARK);
      }
      storage.lsSet(STORAGE_THEME, DARK);
      break;
  }
}
