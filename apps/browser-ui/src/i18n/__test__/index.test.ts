import { getLocale } from "..";

it("getLocale", () => {
  expect(localStorage).toMatchInlineSnapshot(`
    Storage {
      "_store": {},
    }
  `);
  expect(getLocale()).toMatchInlineSnapshot('"en-US"');
});
it("getLocale", () => {
  localStorage.setItem("lang", "zh-CN");
  expect(localStorage).toMatchInlineSnapshot(`
    Storage {
      "_store": {
        "lang": "zh-CN",
      },
    }
  `);
  expect(getLocale()).toMatchInlineSnapshot('"zh-CN"');
});
