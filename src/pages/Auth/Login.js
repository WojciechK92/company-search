import { useHistory, Redirect } from 'react-router-dom';
import AuthForm from './AuthForm';
import useAuth from '../../hooks/useAuth';
import axios from '../../axiosAuth';

function Login() {

  const [auth, setAuth] = useAuth();
  const history = useHistory();

  const submit = async (data) => {

    const res = await axios.post('accounts:signInWithPassword', data);

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
        header='Login' 
        buttonText='Log in'
        onSubmit={submit} />

};

export default Login;