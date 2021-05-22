import { LinkedList, Node } from "./LinkedList";

export class LRU {

    constructor(private maxSize: number = Number.MAX_SAFE_INTEGER) {
        if (typeof maxSize !== 'number' || !Number.isInteger(maxSize) || maxSize < 1) {
            throw new Error('The max size of the cache must be a positive integer but was: ' + maxSize);
        }
    }

    map = new Map<string, Node<any>>();
    linkedList = new LinkedList();

    size() {
        return this.map.size;
    }

    set(key: string, value) {
        if (this.map.has(key)) {
            this.linkedList.remove(this.map.get(key)!);
        }
        const node = this.linkedList.prepend(key, value);
        this.map.set(key, node);

        const removedNodes = this.linkedList.trim(this.maxSize);
        removedNodes.forEach(node => {
            this.map.delete(node.key)
        })
    }

    has(key: string) {
        return this.map.has(key);
    }

    get(key: string) {
        const node = this.map.get(key);
        if (node) {
            this.linkedList.moveToTop(node);
        }
        return node?.item;
    }

    getOrSet(key: string, func: () => any) {
        if (!this.map.has(key)) {
            this.set(key, func());
        }
        return this.get(key);
    }

    delete(key: string) {
        const node = this.map.get(key);
        if (!node) {
            return;
        }
        this.linkedList.remove(node);
        this.map.delete(key);
    }
}