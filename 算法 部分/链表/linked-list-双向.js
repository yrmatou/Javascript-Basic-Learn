// Node类
class Node {
    static getInstance() {
        if (Node.instance) return Node.instance;
        Node.instance = new Node('head');
        return Node.instance;
    }
    constructor(element) {
        this.element = element; // 元素节点
        this.next = null; // 下一节点
        this.previous = null; // 上一节点
    }
}

// LinkedList类
class LList {
    constructor() {
        this.head = Node.getInstance();
    }
    //查找给定节点
    find(item) {
        let currNode = this.head;
        while (currNode.element !== item) {
            currNode = currNode.next;
        }
        return currNode;
    }
    // 插入节点
    insert(newElement, item) {
        let newNode = new Node(newElement);
        let currNode = new LList().find(item);
        newNode.next = currNode.next;
        newNode.previous = currNode;
        currNode.next = newNode;
    }
    // 删除链表元素
    remove(item) {
        let currNode = new LList().find(item);
        console.log(currNode)
        if (!(currNode.next == null)) {
            currNode.previous.next = currNode.next;
            currNode.next.previous = currNode.previous;
            currNode.next = null;
            currNode.previous = null;
        } else {
            currNode.previous.next = null;
        }
    }
    // 显示链表元素
    display() {
        let currNode = this.head;
        while (!(currNode.next == null)) {
            currNode = currNode.next;
        }
        console.log(this.head);
    }
}

let fruits = new LList();
fruits.insert('Apple', 'head');
fruits.insert('Banana', 'Apple');
fruits.insert('Pear', 'Banana');
// fruits.insert('Red', 'Pear');
// fruits.display();
fruits.remove('Banana');
fruits.display();