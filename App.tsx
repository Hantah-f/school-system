import React from 'react';
import { useAuth } from './contexts/AuthContext';
import Login from './screens/Login';
import Dashboard from './screens/Dashboard';

const App: React.FC = () => {
  const { user } = useAuth();

  return (
    <div className="min-h-screen bg-slate-100/50 text-slate-800">
      {user ? <Dashboard /> : <Login />}
    </div>
  );
};

export default App;