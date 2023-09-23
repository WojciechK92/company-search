import { useEffect, useState } from 'react';
import { Redirect } from 'react-router-dom';
import ModalButton from '../../../components/UI/ModalButton/ModalButton';
import { checkValid, changeHandler } from '../../../helpers/validations';
import useAuth from '../../../hooks/useAuth';
import SuccessMessage from '../../../components/Other/SuccessMessage/SuccessMessage';
import app from '../../../firebase';
import { getAuth, reauthenticateWithCredential, EmailAuthProvider, verifyBeforeUpdateEmail, updatePassword } from "firebase/auth";

const authFirebase = getAuth(app);

function ProfileDetails() {
  
  const [loading, setLoading] = useState(false);
  const [resError, setResError] = useState('');
  const [success, setSuccess] = useState(false);
  const [sendEmail, setSendEmail] = useState(false);
  const [auth, setAuth] = useAuth();
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

  function promptForCredentials(password) {

    const credential = EmailAuthProvider.credential(
      authFirebase.currentUser.email,
      password
    );
  
    return credential;
  };

  const submit = async (reauthPassword) => {
    // e.preventDefault();
    setLoading(true);

    const user = authFirebase.currentUser;
    const credential = promptForCredentials(reauthPassword);
    
    try {
      // user reauthentication
      await reauthenticateWithCredential(user, credential)
      // verification and update email
      await verifyBeforeUpdateEmail(authFirebase.currentUser, form.email.value)
      // update password
      await updatePassword(authFirebase.currentUser, form.password.value)

      setSendEmail(auth.email !== form.email.value);
      setSuccess(true);
      setAuth(null);
    } catch(ex) {
      setResError(Object.values(ex)[0]);
      setLoading(false);
      setForm({...form, password: {...form.password, value: '', valid: false}})
    };

  };

  if (success) return <SuccessMessage 
                          to='/login' 
                          redirect='Profile' 
                          logout={true} 
                          sendEmail={sendEmail} />;

  return auth 
    ? <div>
        {resError
          ? <div className='alert alert-danger py-3'>{resError}</div>
          : null 
        }
        <form noValidate onSubmit={e => e.preventDefault()}>
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
          <ModalButton loading={loading} disabled={!checkValid(form)} onSubmit={submit}>Save</ModalButton>
        </form>
      </div>
    : <Redirect to='/' /> 
};

export default ProfileDetails;