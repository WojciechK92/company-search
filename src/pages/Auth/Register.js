import { useHistory, Redirect } from 'react-router-dom';
import useAuth from '../../hooks/useAuth';
import AuthForm from './AuthForm';

function Register() {

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
        header='Registration' 
        buttonText='Register'
        onSubmit={submit} />
};

export default Register;