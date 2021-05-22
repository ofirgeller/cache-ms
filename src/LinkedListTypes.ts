export interface INode<T> {
    readonly prev: INode<T> | undefined
    readonly next: INode<T> | undefined
}

export interface ILinkedList<T> {
    readonly isEmpty: () => boolean
    readonly head: T | undefined
    readonly tail: T | undefined
}


