import React from 'react';
import './App.css';
import { BrowserRouter, Switch, Route } from 'react-router-dom'
import Header from './share/Header';
import Home from './view/Home';
import Detail from './view/Detail';
import AddBlog from './view/AddBlog';
import Todo from './view/Todo';

function App() {
  return (
    <BrowserRouter>
      <Header />
      <div className='App'>
        <Switch>
          <Route exact path='/' component={Home} />
          <Route path='/posts/:id' component={Detail} />
          <Route path='/add' component={AddBlog} />
          <Route path='/list' component={Todo} />
        </Switch>
      </div>
    </BrowserRouter>
  );
}

export default App;
