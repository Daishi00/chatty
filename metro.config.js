const { getDefaultConfig } = require("metro-config")
const { resolver: defaultResolver } = getDefaultConfig.getDefaultValues()
exports.resolver = {
  ...defaultResolver,
  sourceExts: [...defaultResolver.sourceExts, "cjs"],
}

module.exports = (async () => {
  const {
    resolver: { sourceExts, assetExts },
  } = await getDefaultConfig()
  return {
    transformer: {
      babelTransformerPath: require.resolve("react-native-svg-transformer"),
    },
    resolver: {
      assetExts: assetExts.filter(ext => ext !== "svg"),
      sourceExts: [...defaultResolver.sourceExts, "cjs", "svg"],
    },
  }
})()
