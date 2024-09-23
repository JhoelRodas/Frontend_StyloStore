//import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import Navbar from './components/layout/Navbar';
import MyRoutes from './routes/Routes'; //modifique esto a Routes de routes
import Sidebar from './components/layout/Sidebar';
import { AuthProvider, useAuth } from './components/users/AuthContext';


const AppContent = () => {
  const { isLoggedIn, sidebarOpen, setSidebarOpen } = useAuth();

  return (
    <div className="flex h-screen bg-white-100 transition-all duration-300">
      {isLoggedIn && (
        <Sidebar sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />
      )}
      <div className="flex-1 flex flex-col overflow-x-hidden">
        <Navbar />
        <MyRoutes />
      </div>
    </div>
  );
};

const App = () => (
  <BrowserRouter>
    <AuthProvider>
      <AppContent />
    </AuthProvider>
  </BrowserRouter>
);

export default App;
