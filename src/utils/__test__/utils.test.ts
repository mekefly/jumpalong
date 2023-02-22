import { withDefault } from "../utils";

it("withDefault", () => {
  expect(
    withDefault({ xyz: "3" }, { zzz: "2", xyz: "4" })
  ).toMatchInlineSnapshot(`
    {
      "xyz": "3",
      "zzz": "2",
    }
  `);
});
