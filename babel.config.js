module.exports = function (api) {
  api.cache(true);
  return {
    presets: ["babel-preset-expo"],
    plugins: [
      [
        "module-resolver",
        {
          alias: {
            "@assets": "./assets",
            "@components": "./components",
            "@hooks": "./hooks",
            "@navigation": "./navigation",
            "@screens": "./screens",
            "@styles": "./styles",
            "@utils": "./utils",
            "@store": "./store",
          },
          extensions: [".ts", ".tsx"],
        },
      ],
      ["react-native-reanimated/plugin"],
    ],
  };
};
