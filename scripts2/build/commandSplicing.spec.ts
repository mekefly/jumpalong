import { commandSplicing } from "./commandSplicing";

describe("commandSplicing", () => {
  test("a", () => {
    expect(commandSplicing()).toMatchInlineSnapshot("[]");
  });
  test("b", () => {
    expect(commandSplicing([["c1"]])).toMatchInlineSnapshot(`
      [
        [
          "c1",
        ],
      ]
    `);
  });
  test("b2", () => {
    expect(commandSplicing([["c1", "c2"]])).toMatchInlineSnapshot(`
      [
        [
          "c1",
          "c2",
        ],
      ]
    `);
  });
  test("b22", () => {
    expect(
      commandSplicing([
        ["a1", "a2"],
        ["b1", "b2"],
      ])
    ).toMatchInlineSnapshot(`
      [
        [
          "a1",
          "a2",
        ],
        [
          "b1",
          "b2",
        ],
      ]
    `);
  });
  test("c1", () => {
    expect(commandSplicing([["c1"]], [["c2"]])).toMatchInlineSnapshot(`
      [
        [
          "c1",
          "c2",
        ],
      ]
    `);
  });
  test("c12", () => {
    expect(commandSplicing([["c1"], ["b1"]], [["c2"]])).toMatchInlineSnapshot(`
      [
        [
          "c1",
          "c2",
        ],
        [
          "b1",
          "c2",
        ],
      ]
    `);
  });
  test("c2", () => {
    expect(commandSplicing([["c1", "b1"]], [["c2"]])).toMatchInlineSnapshot(`
      [
        [
          "c1",
          "b1",
          "c2",
        ],
      ]
    `);
  });
  test("c22", () => {
    expect(
      commandSplicing(
        [
          ["c1", "b1"],
          ["ac1", "ab1"],
        ],
        [["c2"]]
      )
    ).toMatchInlineSnapshot(`
      [
        [
          "c1",
          "b1",
          "c2",
        ],
        [
          "ac1",
          "ab1",
          "c2",
        ],
      ]
    `);
  });
  test("d", () => {
    expect(commandSplicing([["c1"]], [["c2"]], [["c3"]]))
      .toMatchInlineSnapshot(`
      [
        [
          "c1",
          "c2",
          "c3",
        ],
      ]
    `);
  });
  test("d222", () => {
    expect(
      commandSplicing(
        [["1aa", "2aa"], ["1ba"]],
        [["1ab"], ["1bb"]],
        [["1ac"], ["1bc"]]
      )
    ).toMatchInlineSnapshot(`
      [
        [
          "1aa",
          "2aa",
          "1ab",
          "1ac",
        ],
        [
          "1aa",
          "2aa",
          "1ab",
          "1bc",
        ],
        [
          "1aa",
          "2aa",
          "1bb",
          "1ac",
        ],
        [
          "1aa",
          "2aa",
          "1bb",
          "1bc",
        ],
        [
          "1ba",
          "1ab",
          "1ac",
        ],
        [
          "1ba",
          "1ab",
          "1bc",
        ],
        [
          "1ba",
          "1bb",
          "1ac",
        ],
        [
          "1ba",
          "1bb",
          "1bc",
        ],
      ]
    `);
  });
});
