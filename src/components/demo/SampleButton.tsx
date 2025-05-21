// start
import React, { useState } from 'react';

const SampleButton: React.FC = () => {
  const [count, setCount] = useState(0);

  // ignoreStart
  // This is an internal comment, should not be displayed.
  // ignoreEnd

  const handleClick = () => {
    setCount(count + 1);
    console.log('SampleButton clicked, count is now:', count + 1);
  };

  // // ignore render
  // The console.log above will run, but if this comment affected an element, it wouldn't render.
  // For TSX, this comment's primary effect is on the `renderablePreviewContent` in the parser,
  // which isn't directly used for TSX rendering (dynamic import uses original code).
  // However, it's good to test its presence.

  return (
    <button 
      onClick={handleClick} 
      className="btn btn-primary"
      style={{ margin: '10px', padding: '10px 20px', fontSize: '16px' }}
    >
      Click count: {count}
    </button>
  );
};

export default SampleButton;
// end

// This part is outside the start/end block.
function utilityFunction() {
  console.log("This utility function won't be part of the previewed code.");
}
