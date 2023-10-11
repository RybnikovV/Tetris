import { createRoot } from 'react-dom/client';
import App from './app/app';
import { Provider } from 'react-redux';
import { store } from './app/store.js';

const root = createRoot(document.getElementById("root"));
root.render(
  <Provider store={store}>
    <App/>
  </Provider>
);