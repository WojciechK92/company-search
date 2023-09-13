import { useContext } from 'react';
import ThemeContext from '../../../context/themeContext';
import styles from './LoadingButton.module.css';

function LoadingButton(props) {

  const { color } = useContext(ThemeContext);

  return props.loading 
    ? <button className={`mt-3 btn btn-${color} ${styles.button}`}>
        <div className='spinner-border' role="status">
          <span className="visually-hidden">Loading...</span>
        </div>
      </button>
    : <button className={`mt-2 btn btn-${color} ${styles.button}`}>{props.children}</button>
};

export default LoadingButton;