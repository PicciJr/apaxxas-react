import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import { ChakraProvider } from '@chakra-ui/react';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { Provider } from './services/globalContext';
import { CookiesProvider } from 'react-cookie';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
  <Provider>
    <CookiesProvider>
      <ChakraProvider>
        <App />
      </ChakraProvider>
    </CookiesProvider>
  </Provider>
);

reportWebVitals();
