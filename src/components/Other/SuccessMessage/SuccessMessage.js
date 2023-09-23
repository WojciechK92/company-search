import { useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import PropTypes from 'prop-types';

const SuccessMessage = (props) => {

  const history = useHistory();

  useEffect(() => {

    // const timer1 = setTimeout(() => {
    //   history.push(props.to);
    // }, 4000);

    // return () => clearTimeout(timer1);

  }, [props.to]);

  return (
    <div className='my-5 p-3 text-center alert alert-success'>
      <h3>Success!!!</h3>
      {props.logout 
        ? props.sendEmail
          ? <div>
              <h5>An authorization link has been sent to your email address!</h5>  
              <p>After clicking the link, you will be able to log in using new email and password.</p>
            </div>
          : <h5>You can log in using your new password!</h5>
        : <p>You will soon be redirected to "{props.redirect}"</p>
      }
    </div>
  );
};

SuccessMessage.propTypes = {
  redirect: PropTypes.string.isRequired,
  to: PropTypes.string.isRequired,
  logout: PropTypes.bool,
  sendEmail: PropTypes.bool,
};

export default SuccessMessage;