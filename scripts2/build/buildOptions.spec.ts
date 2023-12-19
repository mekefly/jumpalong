import { createOptions, includeDir, parseCliOptions } from "./buildOptions";

const workSpace = "scripts/build/testCase";
test("includeDir", () => {
  expect(includeDir(["xxx/yyy/zzz", "yyy"], [])).toMatchInlineSnapshot(`
    [
      "xxx/yyy/zzz",
      "yyy",
    ]
  `);
  expect(includeDir(["xxx/yyy/zzz", "/home/user/"], ["zzz"]))
    .toMatchInlineSnapshot(`
    [
      "xxx/yyy/zzz",
    ]
  `);
});
test("parseCliOptions", () => {
  const value = parseCliOptions({ workSpace: "packages,path" }, {
    workSpace: ["packages"],
  } as any);
  expect(value).toMatchInlineSnapshot(`
    {
      "workSpace": [
        "packages",
        "path",
      ],
    }
  `);
});
test("parseCliOptions1", () => {
  const value = parseCliOptions(
    { workSpace: "packages,path", output: "newDist" },
    {
      workSpace: ["packages"],
      output: "dist",
    } as any
  );
  expect(value).toMatchInlineSnapshot(`
    {
      "output": "newDist",
      "workSpace": [
        "packages",
        "path",
      ],
    }
  `);
});
test("createOptions", () => {
  expect(createOptions({ workSpace })).toMatchInlineSnapshot(`
    {
      "declaration": true,
      "disableConcurrent": false,
      "format": [
        "cjs",
        "esm",
        "iife",
      ],
      "include": [],
      "includePackages": [],
      "inputPath": [
        "./src/index.ts",
      ],
      "output": "dist",
      "packages": [
        "R:\\\\Users\\\\meke\\\\Documents\\\\study\\\\templates\\\\workspace-template\\\\scripts\\\\build\\\\testCase\\\\compile-sfc",
        "R:\\\\Users\\\\meke\\\\Documents\\\\study\\\\templates\\\\workspace-template\\\\scripts\\\\build\\\\testCase\\\\compile-sfc copy",
        "R:\\\\Users\\\\meke\\\\Documents\\\\study\\\\templates\\\\workspace-template",
      ],
      "prod": [
        "false",
        "true",
      ],
      "watch": false,
      "workSpace": [
        "scripts/build/testCase",
      ],
    }
  `);
});
test("createOptions", () => {
  const configOptions = createOptions({
    packages: ",",
    workSpace: "scripts/build/testCase",
  });
  expect(configOptions).toMatchInlineSnapshot(`
    {
      "declaration": true,
      "disableConcurrent": false,
      "format": [
        "cjs",
        "esm",
        "iife",
      ],
      "include": [],
      "includePackages": [],
      "inputPath": [
        "./src/index.ts",
      ],
      "output": "dist",
      "packages": [
        "R:\\\\Users\\\\meke\\\\Documents\\\\study\\\\templates\\\\workspace-template\\\\scripts\\\\build\\\\testCase\\\\compile-sfc",
        "R:\\\\Users\\\\meke\\\\Documents\\\\study\\\\templates\\\\workspace-template\\\\scripts\\\\build\\\\testCase\\\\compile-sfc copy",
      ],
      "prod": [
        "false",
        "true",
      ],
      "watch": false,
      "workSpace": [
        "scripts/build/testCase",
      ],
    }
  `);
});
