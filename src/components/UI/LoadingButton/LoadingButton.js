import { useContext } from 'react';
import PropTypes from 'prop-types';
import ThemeContext from '../../../context/themeContext';
import styles from './LoadingButton.module.css';

function LoadingButton(props) {

  const { color } = useContext(ThemeContext);

  return props.loading 
    ? <button className={`mt-2 btn btn-${color} ${styles.button}`}>
        <div className='spinner-border' role="status">
          <span className="visually-hidden">Loading...</span>
        </div>
      </button>
    : <button 
        className={`mt-2 btn btn-${color} ${styles.button}`} 
        disabled={props.disabled}>
          {props.children}
      </button>
};

LoadingButton.propTypes = {
  loading: PropTypes.bool.isRequired,
  disabled: PropTypes.bool,
};

export default LoadingButton;