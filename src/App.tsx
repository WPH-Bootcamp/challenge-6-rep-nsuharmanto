import { Route, Routes } from 'react-router-dom';
import './index.css';
import { routes } from './routes';
import MainLayout from './components/layout/MainLayout';
import { Suspense } from 'react';
import LoadingSpinner from './components/ui/LoadingSpinner'; 

function App() {
  return (
    <MainLayout>
      <Suspense
        fallback={
          <div className="flex items-center justify-center min-h-screen bg-black">
            <LoadingSpinner />
          </div>
        }
      >
        <Routes>
          {routes.map((route) => (
            <Route
              key={route.path}
              path={route.path}
              element={<route.element />}
            />
          ))}
        </Routes>
      </Suspense>
    </MainLayout>
  );
}

export default App;
