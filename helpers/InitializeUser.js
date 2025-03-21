'use client';

import { useEffect } from 'react';
import { useAppDispatch } from '@/store';
import { setUser } from '@/store/user';
// import { useNavigate } from 'react-router-dom';

const TOKEN_EXPIRATION_TIME = parseInt(process.env.NEXT_PUBLIC_TOKEN_EXPIRE_MINS || '60') * 60 * 1000;

const InitializeUser = () => {
  const dispatch = useAppDispatch();
  // const navigate = useNavigate();

  useEffect(() => {
    const storedUser = localStorage.getItem('user');
    const jsonUser = storedUser && JSON.parse(storedUser);

    if (jsonUser && jsonUser.timestamp) {
      if (new Date().getTime() - jsonUser.timestamp > TOKEN_EXPIRATION_TIME) {
        localStorage.removeItem('user');
        // navigate('/auth/sign-in');
        window.location.href = '/';
        return;
      }
    }

    if (storedUser) {
      dispatch(setUser(JSON.parse(storedUser)));
    }
  }, [dispatch]);

  return null; // This component does not render anything
};

export default InitializeUser;
