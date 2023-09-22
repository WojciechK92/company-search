import { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import LoadingButton from '../../components/UI/LoadingButton/LoadingButton';
import { checkValid, changeHandler } from '../../helpers/validations';
import useAuth from '../../hooks/useAuth';

function AuthForm(props) {
  
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
        await props.onSubmit({
          email: form.email.value, 
          password: form.password.value,
          returnSecureToken: true,
        });
      };
    } catch(ex) {
      setResError(Object.values(ex)[0]);

      setForm({...form, 
        email: {...form.email, error: '', valid: true }, 
        password: {...form.password, value: '', valid: false},
      });

      setLoading(false);
    };
  };

  return (
    <div className='card'>
      <div className='card-body'>
        <h2 className='mb-4'>{props.header}</h2>
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
          <LoadingButton loading={loading} disabled={!checkValid(form)}>{props.buttonText}</LoadingButton>
        </form>
      </div>
    </div>
  );
};

AuthForm.propTypes = {
  header: PropTypes.string.isRequired,
  buttonText: PropTypes.string.isRequired,
  onSubmit: PropTypes.func.isRequired,
};

export default AuthForm;