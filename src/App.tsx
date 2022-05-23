import React from 'react';
import './App.css';
import { BrowserRouter, Switch, Route } from 'react-router-dom'
import Header from './share/header.share';
import Home from './view/home.view';
import Detail from './view/detail.view';
import AddBlog from './view/addblog.view';
import Todo from './view/todo.view';
import SignIn from './view/signin.view';
import Table from './view/table.view';

function App() {
  return (
    <BrowserRouter>
      <Header />
      <div className='App'>
        <Switch>
          <Route exact path='/' component={Home} />
          <Route path='/blogs/:id' component={Detail} />
          <Route path='/add' component={AddBlog} />
          <Route path='/list' component={Todo} />
          <Route path='/login' component={SignIn} />
          <Route path='/table' component={Table} />
        </Switch>
      </div>
    </BrowserRouter>
  );
}

export default App;
