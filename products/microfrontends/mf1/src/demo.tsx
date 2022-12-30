import { createRoot } from 'react-dom/client';
import React from 'react';
import App from './components/App';

const render = (target: Element | null) => {
  if (!target) return;

  const root = createRoot(target);

  root.render(<App />);
};

render(document.getElementById('root'));
