import { useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import PropTypes from 'prop-types';

const SuccessMessage = (props) => {

  const history = useHistory();

  useEffect(() => {

    const timer1 = setTimeout(() => {
      history.push(props.to);
    }, 4000);

    return () => clearTimeout(timer1);

  }, [props.to]);

  return (
    <div className='my-5 p-3 text-center alert alert-success'>
      <h3>Success!!!</h3>
      {props.sendEmail 
        ? <div>
            <h5>You will be logged out in a moment!</h5>
            <p>An authorization link has been sent to your email address. If you click on link your email will be updated.</p>  
          </div>
        : <p>You will soon be redirected to "{props.redirect}"</p>
      }
    </div>
  );
};

SuccessMessage.propTypes = {
  redirect: PropTypes.string.isRequired,
  to: PropTypes.string.isRequired,
};

export default SuccessMessage;