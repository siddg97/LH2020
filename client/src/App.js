import React from 'react';
import Landing from './pages/Landing';
import {Switch,Route} from 'react-router-dom';
import Dash from './pages/Dash';

function App() {
  return (
    <Switch>
      <Route exact path='/' component={Landing}/>
      <Route exact path='/dash' component={Dash} />
    </Switch>
  );
}

export default App;