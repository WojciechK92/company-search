import { useState } from 'react';
import { useHistory, Redirect } from 'react-router-dom';
import AuthForm from './AuthForm';
import useAuth from '../../hooks/useAuth';

function Login() {

  const [loading, setLoading] = useState(false);
  const [auth, setAuth] = useAuth();
  const history = useHistory();

  const submit = () => {
    setLoading(true);

    setTimeout(() => {
      setAuth(true);
      history.push('/');
    }, 500);
  };


  return auth 
    ? <Redirect to='/' />
    : <AuthForm 
        header='Login' 
        buttonName='Log in'
        loading={loading} 
        onSubmit={submit} />

};

export default Login;