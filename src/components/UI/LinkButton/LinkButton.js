import { Link } from 'react-router-dom';
import { useContext } from 'react';
import PropTypes from 'prop-types';
import ThemeContext from '../../../context/themeContext';

function LinkButton(props) {

  const { color } = useContext(ThemeContext);

  const clickHandler = () => {
    if (props.onClick) {
      props.onClick();
    };
  };

  return (
    <Link 
      onClick={clickHandler} 
      to={props.to} 
      className={`px-4 py-2 m-0 btn btn-${color}`}>
        {props.children}
    </Link>
  );
};

LinkButton.propTypes = {
  to: PropTypes.string.isRequired,
  onClick: PropTypes.func,
};

export default LinkButton;