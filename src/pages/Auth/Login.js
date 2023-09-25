import { useState } from 'react';
import { Redirect } from 'react-router-dom';
import AuthForm from './AuthForm';
import useAuth from '../../hooks/useAuth';
import useWebTitle from '../../hooks/useWebsiteTitle';
import app from '../../firebase';
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
import ModalInfo from '../../components/UI/ModalInfo/ModalInfo';

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

    if (success) return (
      <ModalInfo label='Successful login!' to='/' time={3000}>
        <p>You will be redirected to the home page!</p>
      </ModalInfo>
    );

  return auth 
    ? <Redirect to='/' />
    : <AuthForm 
        header='Login' 
        buttonText='Log in'
        onSubmit={submit} />

};

export default Login;