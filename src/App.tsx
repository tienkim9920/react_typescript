import React from 'react';
import './App.css';
import { BrowserRouter, Switch, Route } from 'react-router-dom'
import Home from './component/Home';
import Header from './share/Header';
import Footer from './share/Footer';
import About from './component/About';
import List from './component/List';
import Create from './component/Create';
import Detail from './component/Detail';

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Header />
        <Switch>
          <Route exact path="/" component={Home} />
          <Route path="/about" component={About} />
          <Route path="/list" component={List} />
          <Route path="/create" component={Create} />
          <Route path="/detail/:id" component={Detail} />
        </Switch>
        <Footer />
      </BrowserRouter> 
    </div>
  );
}

export default App;
