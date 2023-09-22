import { useState } from 'react';
import { Redirect } from 'react-router-dom';
import useAuth from '../../hooks/useAuth';
import AuthForm from './AuthForm';
import SuccessMessage from '../../components/Other/SuccessMessage/SuccessMessage';
import useWebTitle from '../../hooks/useWebsiteTitle';
import app from '../../firebase';
import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";

function Register() {
  
  const [auth] = useAuth();
  const [success, setSuccess] = useState(false);
  useWebTitle('Company Search - Register');
  
  const submit = async (data) => {
    // register 
    const authFirebase = getAuth(app);
    await createUserWithEmailAndPassword(authFirebase, data.email, data.password)

    setSuccess(true);
  };

  if (success) return <SuccessMessage to='/login' redirect='Login page' />

  return auth 
    ? <Redirect to='/' /> 
    : <AuthForm 
        header='Registration' 
        buttonText='Register'
        onSubmit={submit} />
};

export default Register;