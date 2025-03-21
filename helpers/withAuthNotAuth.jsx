'use client';

import { useRouter } from 'next/navigation';
import { useEffect } from 'react';

export const withAuth = (WrappedComponent) => {
  const Wrapper = (props) => {
    const router = useRouter();

    useEffect(() => {
      const savedUser = localStorage.getItem('user');
      const user = savedUser && JSON.parse(savedUser);

      if (!user) {
        router.push('/'); // Redirect to login if not authenticated
      }
    }, [router]);

    return <WrappedComponent {...props} />;
  };

  return Wrapper;
};

export const withNotAuth = (WrappedComponent) => {
  const Wrapper = (props) => {
    const router = useRouter();

    useEffect(() => {
      const savedUser = localStorage.getItem('user');
      const user = savedUser && JSON.parse(savedUser);

      console.log(user);

      if (user) {
        router.push('/account'); // Redirect to profile if authenticated
      }
    }, [router]);

    return <WrappedComponent {...props} />;
  };

  return Wrapper;
};
