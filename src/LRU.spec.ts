import { LRU } from './LRU';

const V1 = 'val1';
const V2 = 'val2';
const V3 = 'val3';
const V4 = 'val4';
const K1 = 'key1';
const K2 = 'key2';
const K3 = 'key3';
const K4 = 'key3';

describe('LRU basics', () => {

  let lru: LRU;

  beforeEach(() => {
    lru = new LRU();
  });

  it('returns undefined when the value does not exists', () => {
    expect(lru.get('key1')).toBe(undefined);
  });

  it('stores items', () => {
    lru.set('key1', V1);
    expect(lru.get('key1')).toBe(V1);
  });

  it('getOrSet returns the item by calling the getter function', () => {
    const getter = jest.fn(() => V1);
    const fromCache = lru.getOrSet('key1', getter);
    expect(fromCache).toBe(V1);
  });

  it('does not call the getter function if the item is already in cache', () => {
    lru.set('key1', V1);
    expect(lru.getOrSet('key1', () => {
      throw new Error();
    })).toBe(V1);
  });

  it('set replaces an existing value', () => {
    lru.set(K1, V1);
    lru.set(K1, V2);
    expect(lru.get(K1)).toBe(V2);
  });
});

describe('LRU cache evication policy', () => {

  it('allow up to N items', () => {
    const lru = new LRU(2);

    lru.set(K1, V1);
    expect(lru.size()).toBe(1);

    lru.set(K2, V2);
    expect(lru.size()).toBe(2);

    lru.set(K2, V2);
    expect(lru.size()).toBe(2);

    lru.set(K3, V3);
    expect(lru.size()).toBe(2);

    lru.set(K4, V4);
    expect(lru.size()).toBe(2);

    expect(lru.get(K1)).toBeUndefined();
  });
})