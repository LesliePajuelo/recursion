// this is what you would do if you liked things to be easy:
// var stringifyJSON = JSON.stringify;

// but you don't so you're going to write it from scratch:

var stringifyJSON = function(obj) {
  // your code goes here
    
  if (typeof obj === 'number') {
    return obj.toString();
  }

  if (obj === null) {
    return "null";
  } 

  if (typeof obj === 'boolean'){
    if (obj === true) {
      return "true";
    } else {
      return "false";
    }
  }

  if (typeof obj === 'string'){
    return '"' + obj + '"';
  }

  var holder = [];
    if(Array.isArray(obj)){
      
        for(var key in obj){
            holder.push(stringifyJSON(obj[key]));
        }
      
      return "[" + holder + "]";   

  }

  
  var stringContainer = ""; 
  if (Object.keys(obj).length){
    for(var keys in obj) {
      if(typeof obj[keys] === "function" || typeof obj[keys] === "undefined"){
        continue;
      } 
      stringContainer += '"' + keys + '"' + ':' + stringifyJSON(obj[keys]) + ',';

    }
    return '{' + stringContainer.slice(0,-1) + '}';   
  } else {
    return "{}";
  }
  
  };
