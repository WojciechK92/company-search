import { useContext } from 'react';
import ThemeContext from '../../context/themeContext';

function Footer() {

  const { color } = useContext(ThemeContext);

  return (
    <div className={`text-center my-3 text-${color}`}>Company Search 2023</div>
  );
};

export default Footer;