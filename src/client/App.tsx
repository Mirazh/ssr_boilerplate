import * as React from 'react';
import { render } from 'react-dom';

import { Hello } from './components/Hello';

import './App.scss';

const App = () => <Hello compiler="TypeScript" framework="React" />;

render(<App />, document.getElementById('root'));
