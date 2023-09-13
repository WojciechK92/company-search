import { useState } from 'react';
import { useHistory } from 'react-router-dom';
import LoadingButton from "../../components/UI/LoadingButton/LoadingButton";
import useAuth from '../../hooks/useAuth';

function Login() {

  const [loading, setLoading] = useState(false);
  const [auth, setAuth] = useAuth();
  const history = useHistory();

  const submit = (e) => {
    e.preventDefault();
    setLoading(true);

    setTimeout(() => {
      setAuth(true);
      history.push('/');
    }, 500);
  };

  return (
    <div className='card'>
      <div className='card-body'>
        <h2 className='mb-4'>Login</h2>
        <form onSubmit={submit}>
          <div className='mb-3'>
            <label className='form-label'>Email</label>
            <input type='email' className='form-control' />
          </div>
          <div className='mb-3'>
            <label className='form-label'>Password</label>
            <input type='password' className='form-control' />
          </div>
          <LoadingButton loading={loading}>Log in</LoadingButton>
        </form>
      </div>
    </div>
  );
};

export default Login;