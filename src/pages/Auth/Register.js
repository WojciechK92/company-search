import { useState } from 'react';
import { useHistory, Redirect } from 'react-router-dom';
import useAuth from '../../hooks/useAuth';
import AuthForm from './AuthForm';

function Register() {

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
        header='Registration' 
        buttonName='Register'
        loading={loading} 
        onSubmit={submit} />
};

export default Register;