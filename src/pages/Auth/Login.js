import { useState } from 'react';
import { Redirect } from 'react-router-dom';
import AuthForm from './AuthForm';
import useAuth from '../../hooks/useAuth';
import axios from '../../axiosAuth';
import SuccessMessage from '../../components/Other/SuccessMessage/SuccessMessage';
import useWebTitle from '../../hooks/useWebsiteTitle';

function Login() {

  const [auth, setAuth] = useAuth();
  const [success, setSuccess] = useState(false);
  useWebTitle('Company Search - Login');

  const submit = async (data) => {

    const res = await axios.post('accounts:signInWithPassword', data);

    setSuccess(true);

    setAuth({
      userId: res.data.localId,
      email: res.data.email,
      token: res.data.idToken,
    });
  };

  if (success) return <SuccessMessage to='/' redirect='Home page' />

  return auth 
    ? <Redirect to='/' />
    : <AuthForm 
        header='Login' 
        buttonText='Log in'
        onSubmit={submit} />

};

export default Login;