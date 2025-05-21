// start
function greet(name) {
  // ignoreStart
  // This is an internal comment for the JS file.
  // It should be ignored by the parser.
  // ignoreEnd
  console.log(`Hello, ${name}! This message comes from sample.js.`);
  
  // // ignore render 
  // This comment and the line below are for testing the parser.
  // JS files don't have a visual "render" in the same way HTML/TSX do in this component.
  const unusedVariable = "This line is after 'ignore render'";

  return `Hello, ${name}! from sample.js`;
}

const message = greet("JavaScript User");
// end

// This content is outside the start/end block.
console.log("This console log is outside the targeted block.");
