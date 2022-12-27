import { createRoot } from 'react-dom/client';
import React from 'react';
import App from './components/App';
import {A} from '@baroce/models'

const b: A = 2

const attachToDOM = (target: Element | null) => {
  if (!target) return;

  const root = createRoot(target);

  root.render(<App />);
};

attachToDOM(document.getElementById('app'));
