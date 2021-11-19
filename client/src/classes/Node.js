export class Node {
  constructor(value = undefined, prev = undefined, next = undefined) {
    this.value = value;
    this.prev = prev;
    this.next = next;
  }
  setPrev(prev) {
    this.prev = prev;
  }
  setNext(next) {
    this.next = next;
  }
  get() {
    return this.value;
  }
}
