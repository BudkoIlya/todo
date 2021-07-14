import React from 'react';
import './App.css';
import { Header } from './components/header/header';
import { TodoLists } from './components/todolists/todoLists';

const App: React.FC = () => {
  return (
    <div className='App'>
      <Header />
      <TodoLists />
    </div>
  );
};

export default App;
