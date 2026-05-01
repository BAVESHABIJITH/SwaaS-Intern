
import {BrowserRouter} from 'react-router-dom';
import { Provider } from 'react-redux';
import { store } from './store/index';
// import { Toaster } from 'react-hot-toast';
import { useAuth } from './hooks/useAuth';
import AppRoutes from './routes/index'
import { Box,CircularProgress } from '@mui/material';
import { useEffect } from 'react';
import { ThemeProvider } from './context/ThemeContext';
import AuthContextProvider from './context/AuthContext';
const AuthBootstrapper = ({children}:{children:React.ReactNode}) => {
  const {checkAuth, isLoading} = useAuth();

  useEffect(() => {
    checkAuth();
  },[checkAuth]);
  
  if(isLoading) {
    return (
      <Box sx = {{ display:'flex',justifyContent: 'center',alignItems:'center',height:'100vh'}}>
        <CircularProgress/>
      </Box>
    );
  }
  return<>{children}</>;
};

function App() {

  return (
   
   <Provider store={store}>
  <ThemeProvider>
    <AuthContextProvider>
      <BrowserRouter>
        <AuthBootstrapper>
          <AppRoutes/>
        </AuthBootstrapper>
      </BrowserRouter>
    </AuthContextProvider>
  </ThemeProvider>
</Provider>
    
  )
}

export default App