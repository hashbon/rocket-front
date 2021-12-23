import { LAUNCH_TIME } from "../definitions";

export const isLaunchTime = () => +(+new Date() / 1000).toFixed(0) >= LAUNCH_TIME;
