import { LinkedList } from './LinkedList';

const items = [1, 2, 3, 4, 5];

function shouldBeEquivalent<T>(linkedList: LinkedList<T>, array: T[]) {
  expect(linkedList.size).toBe(array.length);
  for (let i = 0; i < array.length; i++) {
    expect(array[i]).toBe(linkedList.elementAt(i))
  }
}

describe('LinkedList', () => {
  it('is equivalent to the array that was used to create it ', () => {
    const linkedList = new LinkedList(items);
    shouldBeEquivalent(linkedList, items);
  });

  it('equivalency is maintained by map', () => {
    const linkedList = new LinkedList(items);
    const func = (i => i * 2);
    const mappedLinkedList = linkedList.map(func);
    const mappedArray = items.map(func);

    shouldBeEquivalent(mappedLinkedList, mappedArray);
  });

  it('equivalency is maintained by append', () => {
    const linkedList = new LinkedList(items);
    const value1 = 9;
    const value2 = 10;
    linkedList.append('k1', value1);
    linkedList.append('k2', value2);
    const array = items.concat();
    array.push(value1);
    array.push(value2);

    shouldBeEquivalent(linkedList, array);
  });

  it('equivalency is maintained by prepend', () => {
    const linkedList = new LinkedList(items);
    const value = 10;
    linkedList.prepend('k1', value);
    const array = items.concat();
    array.unshift(value);

    shouldBeEquivalent(linkedList, array);
  });


  it('equivalency is maintained by strip', () => {
    const linkedList = new LinkedList(items);
    const newSize = 3;
    linkedList.trim(newSize);
    const array = items.concat();
    const trimmedArray = array.slice(0, newSize);

    shouldBeEquivalent(linkedList, trimmedArray);
  });

});