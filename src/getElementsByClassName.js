// If life was easy, we could just do things the easy way:
// var getElementsByClassName = function (className) {
//   return document.getElementsByClassName(className);
// };

// But instead we're going to implement it from scratch:
var getElementsByClassName = function(className, node){
  // your code here
  var results = [];

  var recurseOverElements = function(node) {

    if (node.classList.contains(className)) {  
      results.push(node);
    }

    if (node.hasChildNodes) {
      for (var i = 0; i < node.children.length; i++) {
        recurseOverElements(node.children[i]);
      }
    }

  }

  recurseOverElements(document.body);

  return results; 
};
