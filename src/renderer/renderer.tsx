/**
 * React renderer.
 */
// Import the styles here to process them with webpack
import '_public/style.css';
import './global.scss';
import * as React from 'react';
import { createRoot } from 'react-dom/client';
import App from '_renderer/App';
import { Provider } from 'react-redux'
import { store } from './store'

const container = document.getElementById('app');
// eslint-disable-next-line @typescript-eslint/no-non-null-assertion
const root = createRoot(container!);
root.render(
    <Provider store={store}>
        <App />
    </Provider>
);
