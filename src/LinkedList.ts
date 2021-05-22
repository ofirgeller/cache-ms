import { ILinkedList, INode } from './LinkedListTypes';

export class Node<T> implements INode<T>{
  constructor(public key: string, public item: T) { }
  prev: Node<T> | undefined;
  next: Node<T> | undefined;
}

export class LinkedList<T> implements ILinkedList<Node<T>> {
  constructor(items: T[] = []) {
    items = Array.isArray(items) ? items : [];
    items.forEach((item, index) => {
      this.append(index.toString(), item);
    });
  }

  head: Node<T> | undefined;
  tail: Node<T> | undefined;
  size = 0;

  isEmpty = () => this.size === 0;

  append(key: string, item: T) {
    const node = new Node(key, item);
    if (!this.head) {
      this.head = node;
      this.tail = this.head;
    } else {
      node.prev = this.tail;
      this.tail!.next = node;
      this.tail = this.tail!.next;
    }

    this.size++;
    return node;
  }

  prepend(key: string, item: T) {
    this.size++;
    const node = new Node(key, item);
    if (!this.head) {
      this.head = node;
      this.tail = this.head;
    } else {
      node.next = this.head;
      this.head!.prev = node;
      this.head = this.head!.prev;
    }
    return node;
  }

  map<TResult>(func: (item: T) => TResult) {
    const newLinkedList = new LinkedList<TResult>();
    let curr = this.head;

    while (curr !== undefined) {
      const newItem = func(curr.item);
      newLinkedList.append(curr.key, newItem);
      curr = curr.next;
    }
    return newLinkedList;
  }

  /**O(n) */
  elementAt(index: number) {
    let curr = this.head;
    while (index > 0) {
      curr = curr?.next;
      index--;
    }
    return curr?.item;
  }

  remove(node: Node<T>) {
    if (!node) {
      return;
    }
    const prevNode = node.prev;
    const nextNode = node.next;
    if (prevNode) {
      prevNode.next = nextNode;
    }
    if (nextNode) {
      nextNode.prev = prevNode;
    }
    if (this.head === node) {
      this.head = nextNode;
    }
    if (this.tail === node) {
      this.tail = prevNode;
    }
    this.size--;
  }

  moveToTop(node: Node<T>) {
    this.remove(node);
    node.prev = undefined;
    node.next = this.head;
    this.head = node;
  }

  trim(maxSize: number) {
    const removed: Node<any>[] = [];

    while (this.size > maxSize) {
      removed.push(this.tail!);
      this.remove(this.tail!);
    }
    return removed;
  }
}