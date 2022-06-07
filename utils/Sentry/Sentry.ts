// @ts-nocheck
import * as Sentry from "sentry-expo";

export default {
  init: Sentry.init,
  captureMessage: Sentry.Native.captureMessage,
  captureException(...args) {
    if (__DEV__) console.log("‼️ S.Exp", ...args);
    Sentry.Native.captureException(...args);
  },
};
