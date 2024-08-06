import React from 'react';
import ReactDOM from 'react-dom';

const App = () => {
  return (
    <div>
      <h1>Hello, Qlik with React!</h1>
    </div>
  );
};

// Mount the React component to the DOM element with id 'root'
ReactDOM.render(<App />, document.getElementById('root'));
