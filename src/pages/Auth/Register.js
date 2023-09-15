import { useHistory, Redirect } from 'react-router-dom';
import useAuth from '../../hooks/useAuth';
import AuthForm from './AuthForm';
import axios from '../../axiosAuth';

function Register() {
  
  const [auth, setAuth] = useAuth();
  const history = useHistory();
  
  const submit = async (data) => {
    const res = await axios.post('accounts:signUp', data); 

    setAuth({
      userId: res.data.localId,
      email: res.data.email,
      token: res.data.idToken,
    });

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