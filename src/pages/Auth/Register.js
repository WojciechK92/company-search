import { useState } from 'react';
import { Redirect } from 'react-router-dom';
import useAuth from '../../hooks/useAuth';
import AuthForm from './AuthForm';
import axios from '../../axiosAuth';
import SuccessMessage from '../../components/Other/SuccessMessage/SuccessMessage';

function Register() {
  
  const [auth, setAuth] = useAuth();
  const [success, setSuccess] = useState(false);
  
  const submit = async (data) => {
    const res = await axios.post('accounts:signUp', data); 

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

  if (success) return <SuccessMessage redirect='Home page'/>

  return auth 
    ? <Redirect to='/' /> 
    : <AuthForm 
        header='Registration' 
        buttonText='Register'
        onSubmit={submit} />
};

export default Register;