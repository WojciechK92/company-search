import { useEffect, useState } from 'react';
import { checkValid, changeHandler } from '../../../helpers/validations';
import useAuth from '../../../hooks/useAuth';
import app from '../../../firebase';
import { getAuth, reauthenticateWithCredential, EmailAuthProvider, verifyBeforeUpdateEmail, updatePassword } from "firebase/auth";
import ModalButton from '../../../components/UI/ModalButton/ModalButton';
import ModalInfo from '../../../components/UI/ModalInfo/ModalInfo';
import { convertErrorMessage } from '../../../helpers/errorMessages';

function ProfileDetails() {
  const authFirebase = getAuth(app);
  
  const [loading, setLoading] = useState(false);
  const [resError, setResError] = useState('');
  const [success, setSuccess] = useState(false);
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
  }, []);

  function promptForCredentials(password) {

    const credential = EmailAuthProvider.credential(
      authFirebase.currentUser.email,
      password
    );
  
    return credential;
  };

  const submit = async (reauthPassword) => {
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

      // setSendEmail(auth.email !== form.email.value);
      setSuccess(true);
    } catch(ex) {
      const convertedMessage = convertErrorMessage(Object.values(ex)[0]);
      setResError(convertedMessage);
      resetFormAfterSubmit();
    };
    
  };
  
  const resetFormAfterSubmit = () => {
    setForm({...form, password: {...form.password, value: '', valid: false}})
    setLoading(false);
  };

  if (success) return (
    <ModalInfo label='Successful update!' to='/login' buttonText='Confirm' time={160000} >
      {auth.email === form.email.value
        ? <div>
            <p>You will be logged out in a moment and redirected to the login page!</p>
          </div>
        : <div>
            <p className='mb-1'>We sent to you an authorization link. Click the link and update your profile.</p>
            <p className='mb-1'>Your profile will only be updated if you click the link.</p>
            <p>You will be logged out in a moment and redirected to the login page!</p>
          </div>
      }
    </ModalInfo>
  );

  return (
    <div>
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
  );
};

export default ProfileDetails;