import { Logger } from "../Logger";
import { createIncludePlugin } from "../plugin/createIncludePlugin";

const createCallChain = createIncludePlugin().filter as any;
it("createCallChain:1", () => {
  const logger = new Logger().addPlugin(createIncludePlugin());
  logger.setConfig({ include: true });
  const v = createCallChain(logger);
  expect(v).toMatchInlineSnapshot("true");
});

it("createCallChain:2", () => {
  const logger = new Logger()
    .addPlugin(createIncludePlugin())
    .for("1")
    .for("2")
    .setConfig({ include: true });

  const v = createCallChain(logger);
  expect(v).toMatchInlineSnapshot("true");
});

it("createCallChain:3", () => {
  const logger = new Logger()
    .addPlugin(createIncludePlugin())
    .setConfig({ include: { root: true } });

  const v = createCallChain(logger);
  expect(v).toMatchInlineSnapshot("true");
});

it("createCallChain:for1:for2:1", () => {
  const logger = new Logger()
    .addPlugin(createIncludePlugin())
    .for("1")
    .for("2")
    .setConfig({ include: { root: { "1": true } } });
  const v = createCallChain(logger);
  expect(v).toMatchInlineSnapshot("true");
});

it("createCallChain:for1:for2", () => {
  const logger = new Logger()
    .addPlugin(createIncludePlugin())
    .for("1")
    .for("2")
    .setConfig({ include: { root: { "1": { 2: true } } } });
  const v = createCallChain(logger);
  expect(v).toMatchInlineSnapshot("true");
});

it("createCallChain:for1:for2:undefined", () => {
  const logger = new Logger()
    .addPlugin(createIncludePlugin())
    .for("1")
    .for("2")
    .setConfig({ include: { root: { "1": {} } } });

  const v = createCallChain(logger);
  expect(v).toMatchInlineSnapshot("false");
});

it("createCallChain:for1:for2:undefined", () => {
  const logger = new Logger()
    .addPlugin(createIncludePlugin())
    .for("1")
    .for("2")
    .setConfig({ include: { root: {} } });

  const v = createCallChain(logger);
  expect(v).toMatchInlineSnapshot("false");
});

it("createCallChain:for1:for2:undefined", () => {
  const logger = new Logger()
    .addPlugin(createIncludePlugin())
    .for("1")
    .for("2")
    .setConfig({ include: { root: { "1": { 2: {} } } } });

  const v = createCallChain(logger);
  expect(v).toMatchInlineSnapshot("false");
});

it("createCallChain:for1:for2:more", () => {
  const logger = new Logger()
    .addPlugin(createIncludePlugin())
    .for("1")
    .for("2")
    .setConfig({ include: { root: { "1": { 2: { 3: true } } } } });

  const v = createCallChain(logger);
  expect(v).toMatchInlineSnapshot("false");
});
