import React from 'react';

// Define a functional component
const Greeting = (props) => {
  return (
    <div>
      {/* Access the "name" prop passed from the parent */}
      <h1>Hello, {props.name}!</h1>
    </div>
  );
};

// Example usage of the Greeting component
const App = () => {
  return (
    <div>
      {/* Pass the prop "name" with the value "John" */}
      <Greeting name="John" />
    </div>
  );
};

export default App;
