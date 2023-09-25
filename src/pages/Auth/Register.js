import { useState } from 'react';
import { Redirect } from 'react-router-dom';
import useAuth from '../../hooks/useAuth';
import AuthForm from './AuthForm';
import useWebTitle from '../../hooks/useWebsiteTitle';
import app from '../../firebase';
import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";
import ModalInfo from '../../components/UI/ModalInfo/ModalInfo';

function Register() {
  
  const [auth] = useAuth();
  const [success, setSuccess] = useState(false);
  useWebTitle('Company Search - Register');
  
  const submit = async (data) => {
    // register 
    const authFirebase = getAuth(app);
    await createUserWithEmailAndPassword(authFirebase, data.email, data.password);

    setSuccess(true);
  };

  if (success) return (
    <ModalInfo label='Successful registration!' to='/login' time={3000}>
      <p>You will be redirected to the login page.</p>
    </ModalInfo>
  );

  return auth 
    ? <Redirect to='/' /> 
    : <AuthForm 
        header='Registration' 
        buttonText='Register'
        onSubmit={submit} />
};

export default Register;