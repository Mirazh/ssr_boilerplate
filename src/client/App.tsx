import * as React from 'react';
import { render } from 'react-dom';

import { Hello } from './components/Hello'

const App = () => <Hello compiler="TypeScript" framework="React" />;

render(<App />, document.getElementById('root'));

import './App.scss';