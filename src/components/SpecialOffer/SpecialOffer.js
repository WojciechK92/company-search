import PropTypes from 'prop-types';
import Timer from '../Other/Timer/Timer';
import LinkButton from '../UI/LinkButton/LinkButton';

function SpecialOffer(props) {

  return (
    <div className='card mb-3 text-center'>
      <div className='card-header h4 bg-warning'>Special offer for you!</div>
      <div className='card-body'>
        <p>You stil have time to register with a 25% discount:</p>
        <Timer reset={props.onHide} />
        <LinkButton to='/register'>Register</LinkButton>
      </div>
    </div>
  );
};

SpecialOffer.propTypes = {
  onHide: PropTypes.func.isRequired,
};

export default SpecialOffer;