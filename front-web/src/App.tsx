import React from 'react';
import { Switch, Route } from 'react-router-dom';
import Home from './Pages/Home';
import './App.css';
import Header from './components/Header';
import Records from './Pages/Records';
import Charts from './Pages/Charts';

function App() {
  return (
    <div>
      <Header />
      <Switch>
        <Route exact path="/" component={Home} />
        <Route path="/records" component={Records} />
        <Route path="/charts" component={Charts} />
      </Switch>
    </div>
  );
}

export default App;
