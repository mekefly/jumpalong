import { Logger } from "../Logger";

it("logger", () => {
  const logger = new Logger("global", {});
  const contexts: any[] = [];
  const filters: any[] = [];
  logger.addContext((...rest) => {
    contexts.push(rest);
    return;
  });
  logger.addFilter((...rest) => {
    filters.push(rest);
    return true;
  });
  logger.debug("11");
  expect(contexts).toMatchInlineSnapshot(`
    [
      [
        {
          "level": 5,
        },
        [
          "11",
        ],
      ],
    ]
  `);
  expect(filters).toMatchInlineSnapshot(`
    [
      [
        Logger {
          "config": {},
          "contexts": [
            [Function],
          ],
          "filters": [
            [Function],
          ],
          "path": "global",
        },
        5,
      ],
    ]
  `);
});
