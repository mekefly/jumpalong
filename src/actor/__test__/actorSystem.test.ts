import { currentActor } from "../actor";
import { actors } from "../actorSystem";

it("ActorSystem", async () => {
  const root = await actors();
  const actor = await root.createChild({
    xx(yy: number) {
      return 11 + yy;
    },
  });

  expect(await actor.send("xx", 22)).toMatchInlineSnapshot("33");
});
it("ActorSystem:current", async () => {
  const root = await actors();
  const actor = await root.createChild({
    xx() {
      return new Promise<number>((resolve, reject) => {
        setTimeout(() => {
          resolve(currentActor);
        }, 100);
      });
    },
  });

  const r = await Promise.all(
    Array.from({ length: 6 }, () => actor.send("xx"))
  );

  expect(r).toMatchInlineSnapshot(`
    [
      5,
      3,
      4,
      5,
      5,
      5,
    ]
  `);
});
it("ActorSystem:class", async () => {
  const root = await actors();
  class Test {
    name = "Test";
    constructor() {}
    test() {
      return this.name;
    }
  }
  const actor = await root.createChild(Test);

  const r = await Promise.all(
    Array.from({ length: 3 }, () => actor.send("test"))
  );

  expect(r).toMatchInlineSnapshot(`
    [
      "Test",
      "Test",
      "Test",
    ]
  `);
});
