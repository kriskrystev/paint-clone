import { LinkedList } from "./helpers/data-structures/linked-list.js";

const layersContainer = document.getElementById("inspector__layers");
const ll = new LinkedList();
ll.push(1);
ll.push(2);
ll.push(3);
ll.push(4);
ll.pop();
