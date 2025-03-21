'use client';

import { useEffect } from 'react';
import { useAppSelector } from '@/store';

const SyncUser = () => {
  const userState = useAppSelector((state) => state.user);

  useEffect(() => {
    // Sync the user state with localStorage on the client
    if (userState.email && userState.name && userState.token) {
      localStorage.setItem('user', JSON.stringify(userState));
    } else {
      // localStorage.removeItem('user');
    }
  }, [userState]);

  return null;
};

export default SyncUser;
