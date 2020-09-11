import React, { useState, useEffect } from 'react';
import Task from './Task';
import { IConfig } from '../config/interfaces';

interface Props {
  config: IConfig
}

const Active: React.FC<Props> = ({ config }) => {
  const [active, setActive] = useState([]);

  useEffect(() => {
    fetchActiveTasks();
  }, []);

  const fetchActiveTasks = () => {
    let data = JSON.parse(localStorage.getItem('tasks') || "null");
    if (data) setActive(data.active);
  }

  const renderActiveTask = (task: any, index: number): JSX.Element => <Task 
    key={index} 
    task={task} 
    status="active"
    reset={fetchActiveTasks} 
  />

  const renderActiveTasks = () => {
    if (!active.length) return <div className="d-flex justify-content-center align-items-center text-muted h-100 w-100">No Active Tasks yet!</div>
    return active.map(renderActiveTask)
  }

  return (<div className="h-100 w-100">
    <div className="p-3">
      <h4>My Active Tasks</h4>
      <p className="m-0 text-muted">Welcome back {config.email}. Here is the list of your remaining active tasks.</p>
    </div>
    <div className="h-100 overflow-auto">
      <ul className="list-group">{renderActiveTasks()}</ul>
    </div>
  </div>)
}

export default Active;