import React from 'react';
import { render } from 'react-dom';
import App from './App';
import { IConfig } from './config/interfaces';
import { Context } from './context/context';
import './stylesheets/index.css';

window.addEventListener('DOMContentLoaded', (event) => {
  window.parent.postMessage(JSON.stringify({ action: 'init' }), '*');
  window.removeEventListener('DOMContentLoaded', () => null);
  let data = localStorage.getItem('tasks');
  if (!data) {
    const tasks = {
      active: [{
        id: 0,
        title: 'Buy Eggs',
        description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.'
      }, {
        id: 1,
        title: 'Fix the Sink',
        description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.'
      }, {
        id: 2,
        title: 'Buy Gifts',
        description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.'
      }],
      completed: []
    }
    localStorage.setItem('tasks', JSON.stringify(tasks));
  }
});

window.addEventListener('message', (event) => {
  event.preventDefault();
  if (!event.data || (typeof event.data !== 'string')) return;
  const config: IConfig = JSON.parse(event.data);
  return render(
    <Context.Provider value={JSON.stringify(config)}>
      <App />
    </Context.Provider>,
    document.body
  );
});