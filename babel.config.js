module.exports = function (api) {
  api.cache(true);
  return {
    presets: ["babel-preset-expo"],
    plugins: [
      ["react-native-reanimated/plugin"],
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
          },
          extensions: [".ts", ".tsx"],
        },
      ],
    ],
  };
};
