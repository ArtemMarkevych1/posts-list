import React, {StrictMode} from 'react';
import {createRoot} from 'react-dom/client';
import {Provider} from 'mobx-react';
import {store} from './store';
import App from "./App";
import reportWebVitals from "./reportWebVitals";

const rootElement = document.getElementById('root');
const root = createRoot(rootElement);

root.render(
    <StrictMode>
        <Provider store={store}>
            <App/>
        </Provider>
    </StrictMode>,
);

reportWebVitals();
