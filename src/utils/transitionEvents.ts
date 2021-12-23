// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-nocheck in
let supported: boolean;
let prefix: string;

if (typeof document !== "undefined" && document.createElement) {
  const d = document.createElement("div");

  // eslint-disable-next-line no-restricted-syntax
  for (const i in d.style) {
    if (i in d.style) {
      const m = i.match(/^(moz|webkit|ms|)(transition|animation)$/i);
      if (m) {
        supported = true;
      }
      if (m && m[1]) {
        // согласно спецификации, префиксы к событиям должны быть в нижнем регистре
        // https://www.w3schools.com/jsref/event_transitionend.asp
        prefix = m[1].toLowerCase();
      }
    }
  }
}

const transitionEndEventName: string = prefix ? `${prefix}TransitionEnd` : "transitionend";
const animationEndEventName: string = prefix ? `${prefix}AnimationEnd` : "animationend";

export default {
  supported,
  prefix,
  transitionEndEventName,
  animationEndEventName,
};
