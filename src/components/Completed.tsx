import React, { useState, useEffect } from 'react';
import Task from './Task';
import { IConfig } from '../config/interfaces';

interface Props {
  config: IConfig
}

const Completed: React.FC<Props> = ({ config }) => {
  const [completed, setCompleted] = useState([]);

  useEffect(() => {
    fetchCompletedTasks();
  }, []);

  const fetchCompletedTasks = () => {
    let data = JSON.parse(localStorage.getItem('tasks') || "null");
    if (data) setCompleted(data.completed);
  }

  const renderCompletedTask = (task: any, index: number): JSX.Element => <Task 
    key={index} 
    task={task} 
    status="completed"
    reset={fetchCompletedTasks} 
  />

  const renderCompletedTasks = () => { 
    if (!completed.length) return <div className="d-flex justify-content-center align-items-center text-muted h-100 w-100">No Completed Tasks yet!</div>
    return completed.map(renderCompletedTask)
  }

  return (<div className="h-100 w-100">
    <div className="p-3">
      <h4>Completed Tasks</h4>
      <p className="m-0 text-muted">Welcome back {config.email}. Here is the list of your completed tasks.</p>
    </div>
    <div className="h-100 overflow-auto">
      <ul className="list-group">{renderCompletedTasks()}</ul>
    </div>
  </div>)
}

export default Completed;