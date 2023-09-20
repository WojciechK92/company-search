import { useContext } from 'react';
import AuthContext from '../context/authContext';

function useAuth() {

  const setAuth= (user) => {
    
    if (user) {
      login(user)
      window.localStorage.setItem('user', JSON.stringify(user));
      window.localStorage.setItem('registered', true); 
    } else {
      logout();
      window.localStorage.setItem('user', null);
    };
  };
  
  const { user, login, logout } = useContext(AuthContext);;
  const auth = user;   

  return [auth, setAuth];
};

export default useAuth;