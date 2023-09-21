import { useEffect, useState } from 'react';
import LoadingButton from '../../../components/UI/LoadingButton/LoadingButton';
import { checkValid, changeHandler } from '../../../helpers/validations';
import useAuth from '../../../hooks/useAuth';
import axios from 'axios';

function ProfileDetails() {
  
  const [loading, setLoading] = useState(false);
  const [resError, setResError] = useState('');
  const [auth] = useAuth();
  const [form, setForm] = useState({
    email: {
      value: '',
      error: '',
      showError: true,
      rules: ['required', 'email'], 
      valid: false,
    },
    password: {
      value: '',
      error: '',
      showError: true,
      rules: ['required', 'password'],
      valid: false,
    },
  });

  useEffect(() => {
    if (auth) {
      setForm({...form, email: {...form.email, value: auth.email, valid: true}});
    };
  }, [auth]);

  const submit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      if (checkValid(form)) {
        await axios.post('https://identitytoolkit.googleapis.com/v1/accounts:update?key=AIzaSyCO-FghVgGzBAZ57SnSbmYrCG6YLiwvXgk', {
          idToken: auth.token,
          email: form.email.value, 
          // password: form.password.value,
          returnSecureToken: true,
        });
      };
    } catch(ex) {
      console.log(ex);
      setResError(ex.response.data.error.message);

      setForm({...form, 
        email: {...form.email, error: '', valid: true }, 
        password: {...form.password, value: '', valid: false},
      });

      setLoading(false);
    };
  };

  return (
    <div>
        {resError
          ? <div className='alert alert-danger py-3'>{resError}</div>
          : null 
        }
        <form noValidate onSubmit={submit}>
          <div className='mb-3'>
            <label className='form-label'>Email</label>
            <input 
              value={form.email.value}
              onChange={e => changeHandler(form, setForm, e.target.value, 'email')}
              type='email' 
              className={`form-control 
                ${form.email.error 
                  ? (form.email.showError ? 'is-invalid' : '')
                  : (form.email.value && form.email.showError ? 'is-valid' : '')}`} />
            <div className='invalid-feedback mt-2'>
              {form.email.error} 
            </div>
          </div>
          <div className='mb-3'>
            <label className='form-label'>Password</label>
            <input 
              value={form.password.value}
              onChange={e => changeHandler(form, setForm, e.target.value, 'password')}
              type='password' 
              className={`form-control 
                ${form.password.error 
                  ? (form.password.showError ? 'is-invalid' : '')
                  : (form.password.value ? 'is-valid' : '')}`} />
            <div className='invalid-feedback mt-2'>
              {form.password.error} 
            </div>
          </div>
          <LoadingButton loading={loading} disabled={!checkValid(form)}>Save</LoadingButton>
        </form>
    </div>
  );
};

export default ProfileDetails;