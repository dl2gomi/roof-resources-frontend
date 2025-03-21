'use client';

import { InitializeUser, SyncUser } from '@/helpers';
import { ToastContainer } from 'react-toastify';
import { Provider } from 'react-redux';
import { store } from '@/store';

export function Providers({ children }) {
  return (
    <Provider store={store}>
      <InitializeUser />
      <SyncUser />
      {children}
      <ToastContainer theme="colored" />
    </Provider>
  );
}
