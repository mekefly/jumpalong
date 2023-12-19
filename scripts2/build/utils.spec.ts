import {
  camelize,
  capitalize,
  createEnvString,
  genExportName,
  genFileName,
  genNameByPackageName,
} from "./utils";

test("createEnvString", () => {
  expect(createEnvString("TEST", "xxxx")).toMatchInlineSnapshot(
    '"ROLLUP_BUILD_TEST:xxxx"'
  );
});
test("capitalize", () => {
  expect(capitalize("xxx-xxx")).toMatchInlineSnapshot('"Xxx-xxx"');
  expect(capitalize("xxx_xxx")).toMatchInlineSnapshot('"Xxx_xxx"');
});
test("camelize", () => {
  expect(camelize("xxx-xxx")).toMatchInlineSnapshot('"xxxXxx"');
});
test("genExportName", () => {
  expect(genExportName("xxx-xxx")).toMatchInlineSnapshot('"XxxXxx"');
});
test("genFileName", () => {
  expect(genFileName("xxx-xxx", "cjs", "true")).toMatchInlineSnapshot(
    '"xxx-xxx.cjs.prod.js"'
  );
  expect(genFileName("xxx-xxx", "cjs", "false")).toMatchInlineSnapshot(
    '"xxx-xxx.cjs.js"'
  );
  expect(genFileName("xxx-xxx", "cjs", "")).toMatchInlineSnapshot(
    '"xxx-xxx.cjs.js"'
  );
});
test("genNameByPackageName", () => {
  expect(genNameByPackageName("@mekefly/test")).toMatchInlineSnapshot(
    '"mekefly-test"'
  );
  expect(genNameByPackageName("mekefly-test")).toMatchInlineSnapshot(
    '"mekefly-test"'
  );
  expect(genNameByPackageName("mekeflyTest")).toMatchInlineSnapshot(
    '"mekeflyTest"'
  );
});
