import { useState } from 'react'
import './App.css';
import { Outlet, useLocation } from 'react-router-dom';
import Header from './components/header';
import { createContext } from 'react';
import { Toaster } from 'sonner';
import { AnimatePresence, motion } from 'framer-motion';

export const AuthContext = createContext(null);

function App(){
  const [user, setUser] = useState(null);
  const location = useLocation();

  function handleUser(user){
    setUser(user);
  }

  return (
     <AuthContext.Provider value={{ user, handleUser }}>
       <Toaster richColors position='top-right'/>
       <Header />
       <AnimatePresence mode='wait'>
         <motion.div key={location.pathname} initial={{ opacity: 0, y: 50 }} animate={{ opacity: 1, y: 0}} exit={{ opacity: 0, y: -50 }} transition={{ duration: 0.6 }}>
            <Outlet />
         </motion.div>
       </AnimatePresence>
     </AuthContext.Provider> 
  )
}

export default App;
