import { Link } from 'react-router-dom';
import { useContext } from 'react';
import ThemeContext from '../../../context/themeContext';

function LinkButton(props) {

  const { color } = useContext(ThemeContext);

  return (
    <Link to={props.to} className={`px-4 py-2 mt-2 btn btn-${color}`}>{props.children}</Link>
  );
};

export default LinkButton;