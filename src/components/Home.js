import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Login from './Login';
import Planets from './Planets';

class Home extends Component {
 
  render() {
    return (
      <div>
        <Router>
          <Switch>
            <Route path='/' exact component={Login} />
            <Route path='/planets' exact component={Planets} />
          </Switch>
        </Router>

      </div>
    );
  }
}
export default Home;

