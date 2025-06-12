import { useState } from 'react'
import './App.css';
import { Outlet } from 'react-router-dom';
import Header from './components/header';
import { createContext } from 'react';
import { Toaster } from 'sonner';

export const AuthContext = createContext(null);

function App(){
  const [user, setUser] = useState(null);

  function handleUser(user){
    setUser(user);
  }

  return (
     <AuthContext.Provider value={{ user, handleUser }}>
       <Toaster richColors position='top-right'/>
       <Header />
       <Outlet />
     </AuthContext.Provider> 
  )
}

export default App;
