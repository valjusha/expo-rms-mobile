export { default } from "./Sentry";

export { default as web } from "./Sentry.web";

export const SENTRY_CONFIG = {
  dsn: "https://613bcaed28444047a473616a83b2265b@o1279446.ingest.sentry.io/6480518",
  enableInExpoDevelopment: !__DEV__,
  debug: false,
};
