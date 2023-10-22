import { Header } from 'components/Header';
import { Outlet } from 'react-router-dom';
import { Suspense } from 'react';
import { Circles } from 'react-loader-spinner';

export const Layout = () => {
  return (
    <>
      <Header />
      <Suspense
        fallback={
          <Circles
            height="80"
            width="80"
            color="#4fa94d"
            ariaLabel="circles-loading"
            wrapperClass=""
            visible={true}
            wrapperStyle={{
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
              height: '100vh',
            }}
          />
        }
      >
        <Outlet />
      </Suspense>
    </>
  );
};
