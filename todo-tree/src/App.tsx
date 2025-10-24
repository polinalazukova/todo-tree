import React from 'react';
import { observer } from 'mobx-react-lite';
import TaskList from './components/TaskList/TaskList';
import TaskDetails from './components/TaskDetails/TaskDetails';
import './App.scss';

const App: React.FC = observer(() => {
  return (
    <div className="app">
      <div className="sidebar">
        <TaskList />
      </div>
      <div className="content">
        <TaskDetails />
      </div>
    </div>
  );
});

export default App;