// Mock Expo Winter runtime
global.__ExpoImportMetaRegistry = {};

// Mock structuredClone
global.structuredClone = (obj) => JSON.parse(JSON.stringify(obj));