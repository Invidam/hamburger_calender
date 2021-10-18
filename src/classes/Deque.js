import { Node } from "./Node.js";

const arrToDeque = (initArr) => {
  let head, tail;
  initArr.reduce((prev, curr, idx, arr) => {
    if (idx === 0) {
      curr = new Node(curr);
      head = curr;
    } else {
      curr = new Node(curr, prev);
      prev.next = curr;
      if (idx === arr.length - 1) {
        tail = curr;
      }
    }
    return curr;
  }, undefined);
  return { head, tail };
};
export class Deque {
  constructor(initArr, displayLength) {
    this.startDateIdx = Math.floor((initArr.length - displayLength) / 2);
    // 11 / 2 - 2 = 3
    // 11 - 5 / 3
    // this.head
    // this.tail
    // initArr.reduce((prev, curr, idx, arr) => {}, undefined);
    const { head, tail } = arrToDeque(initArr);
    this.head = head;
    this.tail = tail;
    this.length = initArr.length;
    this.displayLength = displayLength;
  }
  print(text) {
    let itr = this.head;
    const ret = [];
    while (itr !== undefined) {
      ret.push(itr.value);
      itr = itr.next;
    }
  }
  pop_front(cnt = 1) {
    while (cnt--) {
      this.head = this.head.next;
      this.head.prev = undefined;
      this.length--;
    }
  }
  pop_back(cnt = 1) {
    while (cnt--) {
      this.tail = this.tail.prev;
      this.tail.next = undefined;
      this.length--;
    }
  }
  push_front(node) {
    node.next = this.head;
    this.head.prev = node;
    this.head = node;
    this.length++;
  }
  push_back(node) {
    node.prev = this.tail;
    this.tail.next = node;
    this.tail = node;
    this.length++;
  }
  getInRange(from, length) {
    try {
      if (from + length > this.length || from < 0 || length < 1)
        throw new Error(
          `Unexpected arguments ${from} and ${length} in ${this.length}`
        );
      let itr = this.head;
      let idx = 0;
      const ret = [];
      while (idx++ !== from) itr = itr.next;
      while (length--) {
        if (itr === undefined) throw new Error("Deque is not linked well");
        ret.push(itr.value);
        itr = itr.next;
      }
      return ret;
    } catch (error) {
      alert(error);
    }
  }
  get() {
    return this.getInRange(this.startDateIdx, this.displayLength);
  }
}

// const arr = [1, 2, 3, 4, 5];

// const deq = new Deque(arr, 2);

// deq.print();

// deq.push_back(new Node(6));
// deq.print();
// deq.push_front(new Node(0));
// deq.print();

// deq.pop_back();
// deq.print();
// deq.pop_front();
// deq.print();
