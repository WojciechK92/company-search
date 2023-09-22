import { useState } from 'react';
import { Redirect } from 'react-router-dom';
import AuthForm from './AuthForm';
import useAuth from '../../hooks/useAuth';
import SuccessMessage from '../../components/Other/SuccessMessage/SuccessMessage';
import useWebTitle from '../../hooks/useWebsiteTitle';
import app from '../../firebase';
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";

function Login() {
  
  const [auth, setAuth] = useAuth();
  const [success, setSuccess] = useState(false);
  useWebTitle('Company Search - Login');
  
  const submit = async (data) => {
    // login
    const authFirebase = getAuth(app);
    const userCredential = await signInWithEmailAndPassword(authFirebase, data.email, data.password)

    setSuccess(true);
    setAuth(userCredential.user);
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