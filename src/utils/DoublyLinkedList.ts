// Node class
class Node1<T> {
  public data: T;
  public prev: Node1<T> | null;
  public next: Node1<T> | null;

  constructor(data: T) {
    this.data = data;
    this.prev = null;
    this.next = null;
  }
}

// Doubly linked list class
export class DoublyLinkedList<T> {
  public head: Node1<T> | null;
  public tail: Node1<T> | null;
  public size: number;

  constructor() {
    this.head = null;
    this.tail = null;
    this.size = 0;
  }
  // Add a node at the end of the list
  add(data: T) {
    // Create a new node with the given data
    let node = new Node1(data);

    // If the list is empty, set the head and tail to the new node
    if (this.head == null) {
      this.head = node;
      this.tail = node;
    } else {
      // Otherwise, append the new node after the tail and update the pointers
      node.prev = this.tail;
      (this.tail as Node1<T>).next = node;
      this.tail = node;
    }

    // Increment the size of the list
    this.size++;
  }

  // Delete a given node from the list
  delete(node: Node1<T>) {
    // If the list is empty or the node is null, do nothing
    if (this.head == null || node == null) {
      return;
    }

    // If the node is the head, update the head to the next node and set its prev to null
    if (this.head == node) {
      this.head = this.head.next;
      if (this.head != null) {
        this.head.prev = null;
      }
    }

    // If the node is the tail, update the tail to the previous node and set its next to null
    if (this.tail == node) {
      this.tail = this.tail.prev;
      if (this.tail != null) {
        this.tail.next = null;
      }
    }

    // If the node is in the middle, update the pointers of its previous and next nodes
    if (node.prev != null) {
      node.prev.next = node.next;
    }

    if (node.next != null) {
      node.next.prev = node.prev;
    }

    // Decrement the size of the list
    this.size--;
  }
  // Traverse the list from head to tail and print each node's data
  traverseForward(
    callbackfn: (
      v: T,
      index: number,
      node: Node1<T>,
      nodeList: DoublyLinkedList<T>
    ) => void
  ) {
    // Start from the head and move to the next node until reaching the tail or null
    let current = this.head;
    let index = 0;

    while (current != null) {
      // Print the current node's data
      callbackfn(current.data, index, current, this);

      // Move to the next node
      current = current.next;
      index++;
    }
  }

  // Traverse the list from tail to head and print each node's data
  traverseBackward(
    callbackfn: (
      v: T,
      index: number,
      node: Node1<T>,
      nodeList: DoublyLinkedList<T>
    ) => void
  ) {
    // Start from the tail and move to the previous node until reaching the head or null
    let current = this.tail;
    let index = 0;

    while (current != null) {
      // Print the current node's data
      callbackfn(current.data, index, current, this);

      // Move to the previous node
      current = current.prev;
      index++;
    }
  }

  // Get the head of the list
  getHead() {
    return this.head;
  }

  // Get the tail of the list
  getTail() {
    return this.tail;
  }

  // Convert the list to an array and return it
  toArray() {
    // Create an empty array
    let array = [];

    // Start from the head and push each node's data to the array until reaching the tail or null
    let current = this.head;

    while (current != null) {
      array.push(current.data);
      current = current.next;
    }

    // Return the array
    return array;
  }
  toArrayOfTraverseBackward(): T[] {
    let array: T[] = [];
    this.traverseBackward((v) => {
      array.push(v);
    });
    return array;
  }

  // Create a list from an array and return it
  static from<T>(array: Array<T>) {
    // Create a new list
    let list = new DoublyLinkedList<T>();

    // Loop through the array and add each element to the list
    for (let element of array) {
      list.add(element);
    }

    // Return the list
    return list;
  }
}
