import { objectFilter } from "@/utils/object";
import { EventLineFactory } from "../EventLine";

test("type", () => {
  let xxx = new EventLineFactory()
    .add((xx) => {
      return xx.defineEmit<"xx", ["33"]>();
    })
    .add((xx) => {
      return xx.defineEmit<"22", ["33"]>();
    })
    .add((xx) => {
      return xx.defineEmit<"44", ["33"]>();
    })
    .out();
});

test("assignFeat", () => {
  expect(new EventLineFactory().assignFeat({ xx: 1 })).toMatchSnapshot();
});
test("defineFeat应该正常执行", () => {
  expect(new EventLineFactory().defineFeat("xx", 1).line)
    .toMatchInlineSnapshot(`
      EventLineEmitter {
        "emitter": LineEmitter {
          "_returnEmitter": null,
          "events": {},
          "isRunMap": Map {},
        },
        "feat": [Circular],
        "mod": EventLineFactory {
          "core": [Circular],
          "staffNames": Set {},
          "staffs": Set {},
        },
        "xx": 1,
      }
    `);
});
test("assignFeat应该正常执行", () => {
  expect(new EventLineFactory().assignFeat({ xx: 1 }).line)
    .toMatchInlineSnapshot(`
      EventLineEmitter {
        "emitter": LineEmitter {
          "_returnEmitter": null,
          "events": {},
          "isRunMap": Map {},
        },
        "feat": [Circular],
        "mod": EventLineFactory {
          "core": [Circular],
          "staffNames": Set {},
          "staffs": Set {},
        },
        "xx": 1,
      }
    `);
});
test("add应该正常执行", () => {
  expect(new EventLineFactory().add((xx) => xx.assignFeat({ xx: 1 })).line)
    .toMatchInlineSnapshot(`
      EventLineEmitter {
        "emitter": LineEmitter {
          "_returnEmitter": null,
          "events": {},
          "isRunMap": Map {},
        },
        "feat": [Circular],
        "mod": EventLineFactory {
          "core": [Circular],
          "staffNames": Set {},
          "staffs": Set {
            [Function],
          },
        },
        "xx": 1,
      }
    `);
});
test("add添加具名应该正常执行", () => {
  expect(
    objectFilter(
      new EventLineFactory().add(function xxxx(xx) {
        return xx.assignFeat({ xx: 1 });
      }).line
    )
  ).toMatchInlineSnapshot('{}');
});
test("add同名特性不应该重复添加", () => {
  expect(
    new EventLineFactory()
      .add(function xxxx(xx) {
        return xx.assignFeat({ xx: 1 });
      })
      .add(function xxxx(xx) {
        return xx.assignFeat({ yy: 1 });
      }).line
  ).toMatchInlineSnapshot(`
    EventLineEmitter {
      "emitter": LineEmitter {
        "_returnEmitter": null,
        "events": {},
        "isRunMap": Map {},
      },
      "feat": [Circular],
      "mod": EventLineFactory {
        "core": [Circular],
        "staffNames": Set {
          "xxxx",
        },
        "staffs": Set {
          [Function],
        },
      },
      "xx": 1,
    }
  `);
});
