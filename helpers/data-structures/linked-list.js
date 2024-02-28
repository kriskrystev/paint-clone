/**
 * Node for a singly linked list
 * @param {*} val
 */
export function Node(val) {
  this.val = val;
  this.next = null;
}

/**
 * Implementation of a singly linked list
 */
export function LinkedList() {
  this.head = null;
  this.tail = null;
  this.size = 0;
}

LinkedList.prototype.get = function (idx) {
  let counter = 0;
  let node = this.head;

  while (counter < idx) {
    node = node.next;
    counter++;
  }

  return node;
};

LinkedList.prototype.shift = function () {
  if (!this.head) return null;

  const removedNode = this.head;
  this.head = removedNode.next;

  this.size--;

  if (this.size === 0) {
    this.tail = null;
  }
  return removedNode;
};

LinkedList.prototype.unshift = function (val) {
  const newNode = new Node(val);

  if (!this.head) {
    this.head = newNode;
    this.tail = this.head;
  } else {
    newNode.next = this.head;
    this.head = newNode;
  }

  this.size++;

  return newNode;
};

LinkedList.prototype.pop = function () {
  if (!this.head) {
    return null;
  }

  let currentNode = this.head;
  let newTail = currentNode;

  while (currentNode.next) {
    newTail = currentNode;
    currentNode = currentNode.next;
  }

  this.tail = newTail;
  this.tail.next = null;
  this.size--;

  return currentNode;
};

LinkedList.prototype.push = function (val) {
  const newNode = new Node(val);
  if (!this.head) {
    this.head = newNode;
    this.tail = this.head;
  } else {
    this.tail.next = newNode;
    this.tail = newNode;
  }
  this.size++;

  return newNode;
};
