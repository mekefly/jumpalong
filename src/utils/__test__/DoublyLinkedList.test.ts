import { DoublyLinkedList } from "../DoublyLinkedList";
it("DoublyLinkedList", () => {
  const doublyLinkedList = new DoublyLinkedList();
  doublyLinkedList.add(1);

  expect(doublyLinkedList).toMatchInlineSnapshot(`
    DoublyLinkedList {
      "head": Node1 {
        "data": 1,
        "next": null,
        "prev": null,
      },
      "size": 1,
      "tail": Node1 {
        "data": 1,
        "next": null,
        "prev": null,
      },
    }
  `);
});

it("DoublyLinkedList", () => {
  const doublyLinkedList = new DoublyLinkedList();
  doublyLinkedList.add(1);
  doublyLinkedList.add(2);

  expect(doublyLinkedList).toMatchInlineSnapshot(`
    DoublyLinkedList {
      "head": Node1 {
        "data": 1,
        "next": Node1 {
          "data": 2,
          "next": null,
          "prev": [Circular],
        },
        "prev": null,
      },
      "size": 2,
      "tail": Node1 {
        "data": 2,
        "next": null,
        "prev": Node1 {
          "data": 1,
          "next": [Circular],
          "prev": null,
        },
      },
    }
  `);
});

it("DoublyLinkedList:traverseForward", () => {
  const doublyLinkedList = new DoublyLinkedList<number>();
  doublyLinkedList.add(1);
  doublyLinkedList.add(2);

  const array: number[] = [];
  doublyLinkedList.traverseForward((v) => {
    array.push(v);
  });

  expect(array).toMatchInlineSnapshot(`
    [
      1,
      2,
    ]
  `);
});

it("DoublyLinkedList:traverseBackward", () => {
  const doublyLinkedList = new DoublyLinkedList<number>();
  doublyLinkedList.add(1);
  doublyLinkedList.add(2);

  const array: number[] = [];
  doublyLinkedList.traverseBackward((v) => {
    array.push(v);
  });

  expect(array).toMatchInlineSnapshot(`
    [
      2,
      1,
    ]
  `);
});

it("DoublyLinkedList:delete", () => {
  const doublyLinkedList = new DoublyLinkedList<number>();
  doublyLinkedList.add(1);
  doublyLinkedList.add(2);
  doublyLinkedList.add(3);
  const xx = doublyLinkedList.head?.next;

  xx && doublyLinkedList.delete(xx);

  const array: number[] = [];
  doublyLinkedList.traverseForward((v) => {
    array.push(v);
  });

  expect(array).toMatchInlineSnapshot(`
    [
      1,
      3,
    ]
  `);
});

it("DoublyLinkedList:delete:head", () => {
  const doublyLinkedList = new DoublyLinkedList<number>();
  doublyLinkedList.add(1);
  doublyLinkedList.add(2);
  doublyLinkedList.add(3);
  const xx = doublyLinkedList.head;

  xx && doublyLinkedList.delete(xx);

  const array: number[] = [];
  doublyLinkedList.traverseForward((v) => {
    array.push(v);
  });

  expect(array).toMatchInlineSnapshot(`
    [
      2,
      3,
    ]
  `);
});

it("DoublyLinkedList:delete:tail", () => {
  const doublyLinkedList = new DoublyLinkedList<number>();
  doublyLinkedList.add(1);
  doublyLinkedList.add(2);
  doublyLinkedList.add(3);
  const xx = doublyLinkedList.tail;

  xx && doublyLinkedList.delete(xx);

  const array: number[] = [];
  doublyLinkedList.traverseForward((v) => {
    array.push(v);
  });

  expect(array).toMatchInlineSnapshot(`
    [
      1,
      2,
    ]
  `);
});

it("DoublyLinkedList:from", () => {
  const linkedList = DoublyLinkedList.from([4, 5, 6]);

  const array: number[] = [];
  linkedList.traverseForward((v) => {
    array.push(v);
  });
  expect(array).toMatchInlineSnapshot(`
    [
      4,
      5,
      6,
    ]
  `);
});

it("DoublyLinkedList:toArray", () => {
  const linkedList = DoublyLinkedList.from([4, 5, 6]);

  expect(linkedList.toArray()).toMatchInlineSnapshot(`
    [
      4,
      5,
      6,
    ]
  `);
});
