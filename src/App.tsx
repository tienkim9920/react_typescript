import React from 'react';
import './App.css';
import { BrowserRouter, Switch, Route } from 'react-router-dom'
import Header from './share/Header';
import Home from './view/Home';
import Detail from './view/Detail';
import AddBlog from './view/AddBlog';

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Header />
        <Switch>
          <Route exact path='/' component={Home} />
          <Route path='/blogs/:id' component={Detail} />
          <Route path='/addblogs' component={AddBlog} />
        </Switch>
      </BrowserRouter> 
    </div>
  );
}

export default App;
