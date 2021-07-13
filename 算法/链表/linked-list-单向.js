// Node类
class Node {
    static getInstance() {
        if (Node.instance) return Node.instance;
        Node.instance = new Node('head');
        return Node.instance;
    }
    constructor(element) {
        this.element = element;
        this.next = null;
    }
}

// LinkedList类
class LList {
    constructor() {
        this.head = Node.getInstance();   //头节点
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
        currNode.next = newNode;
    }
    // 显示链表元素
    display() {
        let currNode = this.head;
        console.log(currNode)
        while (!(currNode.next == null)) {
            // console.log(currNode.next.element);
            currNode = currNode.next;
        }
    }
    // 找到前一个链表元素
    findPrev(item) {
        let currNode = this.head;
        while (!(currNode.next == null) && (currNode.next.element != item)) {
            currNode = currNode.next;
        }
        return currNode;
    }
    // 删除链表元素
    remove(item) {
        let prevNode = this.findPrev(item);
        if (!(prevNode.next == null)) {
            prevNode.next = prevNode.next.next;
        }
    }
}

let fruits = new LList();
fruits.insert('Apple', 'head');
fruits.insert('Banana', 'Apple');
fruits.insert('Pear', 'Banana');
fruits.insert('Red', 'Pear');
fruits.remove('Banana');
fruits.display();