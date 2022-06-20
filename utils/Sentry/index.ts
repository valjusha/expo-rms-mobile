export { default } from "./Sentry";

export { default as SentryWeb } from "./Sentry.web";
export { default as SentryNative } from "./Sentry.native";

export const dsn =
  "https://613bcaed28444047a473616a83b2265b@o1279446.ingest.sentry.io/6480518";

export const SENTRY_CONFIG = {
  dsn,
  // enableInExpoDevelopment: !__DEV__,
  tracesSampleRate: 1.0,
  debug: false,
};
