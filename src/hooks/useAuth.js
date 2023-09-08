import { useContext } from 'react';
import AuthContext from '../context/authContext';

function useAuth() {
  const setAuth= (newValue) => {
    newValue ? login() : logout();
  };
  
  const { isAuthenticated, login, logout } = useContext(AuthContext);;
  const auth = isAuthenticated;   

  return [auth, setAuth];
};

export default useAuth;