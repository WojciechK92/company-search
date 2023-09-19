import { useState } from 'react';
import { Redirect } from 'react-router-dom';
import AuthForm from './AuthForm';
import useAuth from '../../hooks/useAuth';
import axios from '../../axiosAuth';
import SuccessMessage from '../../components/Other/SuccessMessage/SuccessMessage';

function Login() {

  const [auth, setAuth] = useAuth();
  const [success, setSuccess] = useState(false);

  const submit = async (data) => {

    const res = await axios.post('accounts:signInWithPassword', data);

    setSuccess(true);
    setTimeout(() => {
      setSuccess(false);
    }, 3000);

    setAuth({
      userId: res.data.localId,
      email: res.data.email,
      token: res.data.idToken,
    });
  };

  if (success) return <SuccessMessage redirect='home page' />

  return auth 
    ? <Redirect to='/' />
    : <AuthForm 
        header='Login' 
        buttonText='Log in'
        onSubmit={submit} />

};

export default Login;