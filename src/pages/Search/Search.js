import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import LoadingIcon from '../../components/UI/LoadingIcon/LoadingIcon';

function Search() {
  const { term } = useParams();
  const [loading, setLoading] = useState(false);

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
          : <div>My companies</div>
        }
      </div>
    </div>

  );
};

export default Search;