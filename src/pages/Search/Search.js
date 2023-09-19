import { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import PropTypes from 'prop-types';
import LoadingIcon from '../../components/UI/LoadingIcon/LoadingIcon';
import axios from '../../axios';
import objectToArrayWithId from '../../helpers/objectToArrayWithId';
import Companies from '../../components/Companies/Companies';

function Search(props) {
  const location = useLocation();
  const [loading, setLoading] = useState(false);
  const [companies, setCompanies] = useState([]);

  const queryParams = new URLSearchParams(location.search);
  const term = queryParams.get('term');  

  const fetchCompanies = async () => {
    try {
      setLoading(true);
      const res = await axios.get('/companies.json'); 
      const newCompanies = objectToArrayWithId(res.data).filter(company => company.name.toLowerCase().includes(term.toLowerCase())); 
      
      setCompanies(newCompanies);
      setLoading(false);
    } catch(ex) {
      console.log(ex.response);
    };
  };

  useEffect(() => {
    fetchCompanies();
  }, [term]);

  return (
    <div className='card'>
      <div className='card-body'>
        <h5>Results for searched phrase: '{term}'</h5>
        {loading 
          ? <LoadingIcon />
          : <Companies companies={companies} onOpen={props.onOpen} />
        }
      </div>
    </div>

  );
};

Search.propTypes = {
  onOpen: PropTypes.func.isRequired,
};

export default Search;