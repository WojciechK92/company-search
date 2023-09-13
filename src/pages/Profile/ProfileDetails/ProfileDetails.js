import { useState } from 'react';
import LoadingButton from '../../../components/UI/LoadingButton/LoadingButton';

const ProfileDetails = () => {

  const [loading, setLoading] = useState(false);

  const submit = (e) => {
    e.preventDefault();
    setLoading(true);

    setTimeout(() => {
      //saving
      setLoading(false);
    }, 500);

  };

  return (
    <form onSubmit={submit}>
      <div className='mb-3'>
        <label className='form-label'>Email</label>
        <input type='email' className='form-control' />
      </div>
      <div className='mb-3'>
        <label className='form-label'>Password</label>
        <input type='password' className='form-control' />
      </div>
      <LoadingButton loading={loading}>Save</LoadingButton>
    </form>
    
  );
};

export default ProfileDetails;