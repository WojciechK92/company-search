import PropTypes from 'prop-types';
import styles from './Button.module.css';

function Button(props) {

  return (
    <button 
      onClick={e => props.onClick(e)}
      className={`mt-2 btn btn-${props.color} ${styles.button}`} 
      disabled={props.disabled}>
        {props.children}
    </button>
  );
};

Button.defaultProps = {
  disabled: false,
  color: 'dark',
};

Button.propTypes = {
  disabled: PropTypes.bool,
  color: PropTypes.string, 
};

export default Button;