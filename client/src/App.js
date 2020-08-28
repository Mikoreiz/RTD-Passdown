import React from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom'
import './App.css';
import RepairLog from './components/RepairLog'

import { Provider } from 'react-redux'
import store from './store'

const App = () => {
  return (
    <Provider store={store}>
      <Router>
        <Route exact path='/' component={RepairLog} />
      </Router>
    </Provider>
  );
}

export default App;
