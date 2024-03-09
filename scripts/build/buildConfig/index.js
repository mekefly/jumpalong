import { createConfig } from "./createConfig";
import { initOptions } from "./initOptions";
import { setupPackageJSON } from "./setupPackageJSON";

// import resolve from "@rollup/plugin-node-resolve";
// import replace from "@rollup/plugin-replace";
// import commonjs from "@rollup/plugin-commonjs";
// import ts from "rollup-plugin-typescript2";
// import { terser } from "rollup-plugin-terser";
// import path from "path";
// import { babel } from "@rollup/plugin-babel";
// import packageJson from "./package.json";

const options = initOptions();
const config = createConfig(options);
setupPackageJSON(options);

export default config;
