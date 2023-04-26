import { Logger } from "../Logger";

it("logger", () => {
  const logger = new Logger("global", {});
  const r: any[] = [];
  logger.addContext((...rest) => {
    r.push(rest);
    return;
  });
  logger.addFilter((...rest) => {
    r.push(rest);
    return true;
  });
  logger.debug("11");
  expect(r).toMatchInlineSnapshot();
});
