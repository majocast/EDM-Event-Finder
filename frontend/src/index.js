import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import { QueryClient, QueryClientProvider } from 'react-query';

// comment this and react query dev tools when in prod
const queryClient = new QueryClient();

ReactDOM.render(
  <QueryClientProvider client={queryClient} contextSharing={true}>
    <App />
  </QueryClientProvider>,
  document.getElementById('root')
);