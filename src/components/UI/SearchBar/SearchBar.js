import styles from './SearchBar.module.css';
import { useState } from 'react';

function SearchBar(props) {
  const [term, setTerm] = useState('');

  const search = () => {
    props.onSearch(term);
  };

  const enterKeyHandler = (e) => {
    if (e.key === 'Enter') search();
  };

  return (
    <div className={`form-group w-50 ${styles.searchBar}`}>
      <input 
        value={term}
        onChange={e => setTerm(e.target.value)}
        onKeyDown={enterKeyHandler}
        type='text' 
        placeholder='Search...' 
        className='form-control' />
      <button 
        onClick={search}
        className='btn btn-primary'>
          Search
      </button>
    </div>
  );
};

export default SearchBar;