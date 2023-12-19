import { createPlugin } from "./createPlugin";
export function createConfig(options) {
  const { input, output, name, format, prod, packageJson } = options;
  const { dependencies, peerDependencies } = packageJson;

  const plugins = createPlugin(options);

  let external = ["logger"];

  if (format === "iife") {
  } else {
    external = [
      ...Object.keys(dependencies || {}),
      ...Object.keys(peerDependencies || {}),
    ];
  }

  return {
    input,
    // external,
    plugins: plugins,
    output: {
      file: output,
      // globals: { logger: "logger" },
      format,
      name,
    },
  };
}
