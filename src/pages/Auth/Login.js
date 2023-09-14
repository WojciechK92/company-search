import { useHistory, Redirect } from 'react-router-dom';
import AuthForm from './AuthForm';
import useAuth from '../../hooks/useAuth';

function Login() {

  const [auth, setAuth] = useAuth();
  const history = useHistory();

  const submit = (form) => {
    // request to backend
    setAuth(true);
    history.push('/');
  };


  return auth 
    ? <Redirect to='/' />
    : <AuthForm 
        header='Login' 
        buttonText='Log in'
        onSubmit={submit} />

};

export default Login;