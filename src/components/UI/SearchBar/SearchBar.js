import { useState, useContext } from 'react';
import styles from './SearchBar.module.css';
import PropTypes from 'prop-types';
import ThemeContext from '../../../context/themeContext';

function SearchBar(props) {
  const [term, setTerm] = useState('');
  const { color } = useContext(ThemeContext);

  const search = () => {
    props.onSearch(term);
  };

  const enterKeyHandler = (e) => {
    if (e.key === 'Enter') search();
  };

  return (
    <div className={`form-group w-50 me-1 ${styles.searchBar}`}>
      <input 
        value={term}
        onChange={e => setTerm(e.target.value)}
        onKeyDown={enterKeyHandler}
        type='text' 
        placeholder='Search...' 
        className='form-control' />
      <button 
        onClick={search}
        className={`btn btn-${color}`}>
          Search
      </button>
    </div>
  );
};

SearchBar.propTypes = {
  onSearch: PropTypes.func.isRequired,
};

export default SearchBar;