function add() {
  return 1 + 1;
}
it("xx", () => {
  expect(add()).toMatchInlineSnapshot("2");
  expect(window.document.createElement("div")).toMatchInlineSnapshot("<div />");
});
export {};
