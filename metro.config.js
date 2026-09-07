const { getDefaultConfig } = require("expo/metro-config");

const config = getDefaultConfig(__dirname);

// Support WebAssembly files used by expo-sqlite
config.resolver.assetExts.push("wasm");

module.exports = config;