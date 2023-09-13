import { useState, useContext, useRef, useEffect } from 'react';
import { useHistory, useLocation } from 'react-router-dom';
import styles from './SearchBar.module.css';
import ThemeContext from '../../../context/themeContext';

function SearchBar() {
  const [term, setTerm] = useState('');

  const { color } = useContext(ThemeContext);

  const history = useHistory();
  const location = useLocation();
  const inputRef = useRef(null);
  
  const search = () => {
    term 
    ? history.push({
      pathname: 'search',
      search: `term=${term}`,
    }) 
    : history.push('/');
  };
  
  const enterKeyHandler = (e) => {
    if (e.key === 'Enter') search();
  };
  
  useEffect(() => {
    inputRef.current.focus();
  }, []);

  useEffect(() => {
    if (history.action === 'PUSH' && !location.search) setTerm('');
  }, [location]);
  
  return (
    <div className={`form-group w-50 me-1 ${styles.searchBar}`}>
      <input 
        value={term}
        onChange={e => setTerm(e.target.value)}
        onKeyDown={enterKeyHandler}
        type='text' 
        placeholder='Search...' 
        className='form-control' 
        ref={inputRef} />
      <button 
        onClick={search}
        className={`btn btn-${color}`}>
          Search
      </button>
    </div>
  );
};

export default SearchBar;