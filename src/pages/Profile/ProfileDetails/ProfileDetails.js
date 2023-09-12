const ProfileDetails = () => {
  return (
    <form>
      <div className='mb-3'>
        <label className='form-label'>Email</label>
        <input type='email' className='form-control' />
      </div>
      <div className='mb-3'>
        <label className='form-label'>Password</label>
        <input type='password' className='form-control' />
      </div>
      <button className='btn btn-primary px-4 py-2 mt-3'>Save</button>
    </form>
    
  );
};

export default ProfileDetails;