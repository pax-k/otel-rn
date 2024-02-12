import "openai/shims/web";
// import "react-native-polyfill-globals/auto";
global.process.nextTick = setImmediate;
import { polyfillGlobal } from "react-native/Libraries/Utilities/PolyfillFunctions";
polyfillGlobal("FileReader", () => require("./CustomFileReader"));
window.addEventListener = () => {};
window.removeEventListener = () => {};
