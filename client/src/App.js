import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
import './App.css';
import RepairLog from './components/RepairLog'
import Update from './components/Update'
import View from './components/View'
import ArchiveLog from './components/ArchiveLog'

import { Provider } from 'react-redux'
import store from './store'

const App = () => {
  return (
    <Provider store={store}>
      <Router>
        <Switch>
          <Route exact path='/' component={RepairLog} />
          <Route exact path='/update/:_id' component={Update} />
          <Route exact path='/view' component={View} />
          <Route exact path='/archive' component={ArchiveLog} />
          </Switch>
      </Router>
    </Provider>
  )
}

export default App;
