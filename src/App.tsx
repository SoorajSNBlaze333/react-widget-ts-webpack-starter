import React, { useContext, useState } from 'react';
import { IConfig } from './config/interfaces';
import { Context } from './context/context';
import Active from './components/Active';
import Completed from './components/Completed';
import NewTask from './components/NewTask';

const App: React.FC = (props) => {
  const config: IConfig = JSON.parse(useContext(Context));
  const [page, setPage] = useState<Number>(1);
  
  const renderHeader = () => {
    return (<h3 className="bg-dark p-3 m-0 text-white">Todo-List</h3>);
  }

  const renderLinks = () => {
    return (<div className="nav row m-0 bg-light">
      <a className="nav-link col-4 text-center" href="#" onClick={() => setPage(1)}>Active</a>
      <a className="nav-link col-4 text-center" href="#" onClick={() => setPage(2)}>New</a>
      <a className="nav-link col-4 text-center" href="#" onClick={() => setPage(3)}>Completed</a>
    </div>)
  }

  const renderComponent = () => {
    switch(page) {
      case 1: return <Active config={config}/>
      case 2: return <NewTask setPage={setPage}/>
      case 3: return <Completed config={config}/>
      default: return <Active config={config}/>
    }
  }

  return (<div className="h-100 w-100 border rounded">
    {renderHeader()}
    {renderLinks()}
    {renderComponent()}
  </div>);
}

export default App;