import { matchTagPlaceholderRegExp, matchUrlRegExp } from "@/utils/RegExpUtils";
it("matchUrl", () => {
  expect(
    matchUrlRegExp().test(
      "https://c.runoob.com/front-end/7625/#!flags=&re=(https%3F%7Cftp%7Cfile)%3A%2F%2F%5B-A-Za-z0-9%2B"
    )
  ).toMatchInlineSnapshot("true");
});

it("matchUrl", () => {
  expect(
    matchUrlRegExp().test("https://www.runoob.com/regexp/regexp-syntax.html")
  ).toMatchInlineSnapshot("true");
});

it("matchTagPlaceholderRegExp", () => {
  expect(matchTagPlaceholderRegExp().test("#[0]")).toMatchInlineSnapshot(
    "true"
  );
});

it("matchTagPlaceholderRegExp", () => {
  expect(matchTagPlaceholderRegExp().test("11#[0]22")).toMatchInlineSnapshot(
    "true"
  );
});

it("matchTagPlaceholderRegExp", () => {
  expect(matchTagPlaceholderRegExp().test("11#[10]22")).toMatchInlineSnapshot(
    "true"
  );
});
it("matchTagPlaceholderRegExp", () => {
  expect(
    matchTagPlaceholderRegExp().test("11#[139473284732134]22")
  ).toMatchInlineSnapshot("true");
});
it("matchTagPlaceholderRegExp", () => {
  expect(
    matchTagPlaceholderRegExp().test("11#[139473284732134 ]22")
  ).toMatchInlineSnapshot("false");
});
it("matchTagPlaceholderRegExp", () => {
  expect(
    matchTagPlaceholderRegExp().test("11#[139473284732134]]22")
  ).toMatchInlineSnapshot("true");
});
it("matchTagPlaceholderRegExp", () => {
  expect(
    matchTagPlaceholderRegExp().test("11#[[139473284732134]]22")
  ).toMatchInlineSnapshot("false");
});
it("matchTagPlaceholderRegExp", () => {
  expect(
    matchTagPlaceholderRegExp().test("##[#[139473284732*34]fds")
  ).toMatchInlineSnapshot("false");
});
it("matchTagPlaceholderRegExp", () => {
  expect(
    matchTagPlaceholderRegExp().test("#[##[0#[1]]]")
  ).toMatchInlineSnapshot("true");
});
