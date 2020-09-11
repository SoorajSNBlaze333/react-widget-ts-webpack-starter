import React from 'react';

interface Props {
  task: any;
  status: string;
  reset: () => void
}

const Task: React.FC<Props> = ({ task, status, reset }) => {
  const handleChange = (event: any) => {
    console.log(event.target.checked);
    let data = JSON.parse(localStorage.getItem('tasks') || "null");
    let active = data.active;
    let completed = data.completed;

    if (status === 'active') {
      let index = active.findIndex(((t: { id: number; }) => t.id === task.id));
      let temp = active[index];
      data.active.splice(index, 1);
      data.completed.unshift(temp);
    } else if (status === 'completed') {
      let index = completed.findIndex(((t: { id: number; }) => t.id === task.id));
      let temp = completed[index];
      data.completed.splice(index, 1);
      data.active.unshift(temp);
    } 
    localStorage.setItem('tasks', JSON.stringify(data));
    reset();
  }

  return (<li className="list-group-item border-right-0 border-left-0 p-0 d-flex justify-content-between align-items-center h-100 w-100">
    <div className="mx-3 my-2 h-100">
      <h4 className="m-0">{task.title}</h4>
      <p className="m-0">{task.description}</p>
    </div>
    <div className="mx-3 my-2 h-100">
      <button className="btn btn-sm btn-primary" onClick={handleChange}>{status === 'active' ? 'Complete' : 'Restart'}</button>
    </div>
  </li>)
}

export default Task;