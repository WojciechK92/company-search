import LoadingButton from '../../components/UI/LoadingButton/LoadingButton';

function AuthForm(props) {

  const submit = (e) => {
    e.preventDefault();
    props.onSubmit();
  };

  return (
    <div className='card'>
      <div className='card-body'>
        <h2 className='mb-4'>{props.header}</h2>
        <form onSubmit={submit}>
          <div className='mb-3'>
            <label className='form-label'>Email</label>
            <input type='email' className='form-control' />
          </div>
          <div className='mb-3'>
            <label className='form-label'>Password</label>
            <input type='password' className='form-control' />
          </div>
          <LoadingButton loading={props.loading}>{props.buttonName}</LoadingButton>
        </form>
      </div>
    </div>
  );
};

export default AuthForm;