import { useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import PropTypes from 'prop-types';

const SuccessMessage = (props) => {

  const history = useHistory();

  useEffect(() => {
    const timer = setTimeout(() => {
      history.push(props.to);
    }, 3000);

    return () => clearTimeout(timer);

  }, []);

  return (
    <div className='my-5 p-3 text-center alert alert-success'>
      <h3>Success!!!</h3>
      <p>You will soon be redirected to "{props.redirect}"</p>
    </div>
  );
};

SuccessMessage.propTypes = {
  redirect: PropTypes.string.isRequired,
  to: PropTypes.string.isRequired,
};

export default SuccessMessage;