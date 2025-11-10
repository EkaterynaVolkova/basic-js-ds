const { NotImplementedError } = require('../lib/errors');
const { Node } = require('../extensions/list-tree.js');

/**
* Implement simple binary search tree according to task description
* using Node from extensions
*/
class BinarySearchTree {

  constructor(){
    this.main = null;
  }

  root() {
    return this.main;
  }

  add(data) {
    this.main = addElem(this.main, data);

    function addElem(node, value){
      if (!node) {
        return new Node(value);
      }

      if (node.value === value) {
        return node;
      }

      if (data < node.data) {
        node.left = addElem(node.left, data);
      } else {
        node.right = addElem(node.right, data);
      }

      return node;
    }
  }

  find(data) {
    let result = null;

    function findNode( node, data ){
      if (!node){
        return;
      }
      if (node.data == data ) {
        result = node;
        return;
      } else if ( data < node.data ) {
        findNode( node.left, data );
      } else {
        findNode( node.right, data );
      }
    }

    findNode( this.main, data );
    return result;
  }

  has(data) {   
     let result = false;

    function searchElem( node, data ){
      if (!node){
        return;
      }
      if (node.data == data ) {
        result = true;
      } else if ( data < node.data ) {
        searchElem( node.left, data );
      } else {
        searchElem( node.right, data );
      }
    }

    searchElem( this.main, data );
    return result;
  }

  remove(data) {
    this.main = removeNode(this.main, data);

    function removeNode(node, data) {
      if (!node) {
        return null;
      }

      if (data < node.data) {
        node.left = removeNode(node.left, data);
        return node;
      } else if (node.data < data) {
        node.right = removeNode(node.right, data);
        return node;
      } else {
        if (!node.left && !node.right) {
          return null;
        }

        if (!node.left) {
          node = node.right;
          return node;
        }

        if (!node.right) {
          node = node.left;
          return node;
        }

        let minRight = node.right;
        while (minRight.left) {
          minRight = minRight.left;
        }
        node.data = minRight.data;

        node.right = removeNode(node.right, minRight.data);

        return node;
      }
    }
  }

  min() {
    let node = this.main;

    if (!node){
      return;
    }

    while(node.left) {
      node = node.left;
    }

    return node.data;
  }

  max() {
    let node = this.main;

    if (!node){
      return;
    }

    while(node.right) {
      node = node.right;
    }

    return node.data;
  }
}

module.exports = {
  BinarySearchTree
};