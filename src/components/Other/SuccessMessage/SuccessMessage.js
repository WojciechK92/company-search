import PropTypes from 'prop-types';

const SuccessMessage = (props) => {
  return (
    <div className='my-5 p-3 text-center alert alert-success'>
      <h3>Success!!!</h3>
      <p>You will soon be redirected to "{props.redirect}"</p>
    </div>
  );
};

SuccessMessage.propTypes = {
  redirect: PropTypes.string.isRequired,
};

export default SuccessMessage;