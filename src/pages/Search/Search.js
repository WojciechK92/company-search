import { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import LoadingIcon from '../../components/UI/LoadingIcon/LoadingIcon';

function Search() {
  const location = useLocation();
  const [loading, setLoading] = useState(false);

  const queryParams = new URLSearchParams(location.search);
  const term = queryParams.get('term');  

  useEffect(() => {
    setLoading(true);
    
    setTimeout(() => {
      // loading from backend

      setLoading(false);
    }, 1000);
  }, [term]);

  return (
    <div className='card'>
      <div className='card-body'>
        <h5>Results for searched phrase: '{term}'</h5>
        {loading 
          ? <LoadingIcon />
          : <div>Filtred companies</div>
        }
      </div>
    </div>

  );
};

export default Search;