import React from 'react';

interface Props {
  setPage: (page: number) => void
}

const NewTask: React.FC<Props> = ({ setPage }) => {
  const handleSubmit = (event: any) => {
    event.preventDefault();
    let data = JSON.parse(localStorage.getItem('tasks') || "null");
    const task = {
      id: data.active.length,
      title: event.target.title.value,
      description: event.target.desc.value
    }
    data.active.push(task);
    localStorage.setItem('tasks', JSON.stringify(data));
    return setPage(1);
  }

  return (
    <form onSubmit={handleSubmit} className="p-3">
      <div className="form-group">
        <label htmlFor="title">Title</label>
        <input type="text" name="title" className="form-control" id="title" aria-describedby="emailHelp" placeholder="Enter title"/>
      </div>
      <div className="form-group">
        <label htmlFor="description">Description</label>
        <textarea name="desc" className="form-control" id="description" rows={3}></textarea>
      </div>
      <button type="submit" className="btn btn-primary">Submit</button>
    </form>
  )
}

export default NewTask;