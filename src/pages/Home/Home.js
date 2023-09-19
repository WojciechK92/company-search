import { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import Companies from '../../components/Companies/Companies';
import SpecilOffer from '../../components/SpecialOffer/SpecialOffer';
import LoadingIcon from '../../components/UI/LoadingIcon/LoadingIcon';
import LastCompany from '../../components/Companies/LastCompany/LastCompany';
import axios from '../../axios';
import objectToArrayWithId from '../../helpers/objectToArrayWithId';

function Home(props) {
  const [companies, setCompanies] = useState([]);  
  const [loading, setLoading] = useState(true);

  const fetchCompanies = async () => {
    try {
      const res = await axios.get('/companies.json');
      const newCompanies = objectToArrayWithId(res.data);
      setCompanies(newCompanies);
      setLoading(false);
    } catch(ex) {
      console.log(ex.response);
    };
  };

  useEffect(() => {
    fetchCompanies();
  }, []);

  return loading 
    ? <LoadingIcon /> 
    : <>
        <SpecilOffer />
        {props.lastCompany 
          ? <LastCompany lastCompany={props.lastCompany} onRemove={props.onRemove} /> 
          : null}
        <Companies 
          companies={companies} 
          onOpen={props.onOpen} />
      </>
};

Home.propTypes = {
  lastCompany: PropTypes.object,
  onRemove: PropTypes.func.isRequired,
  onOpen: PropTypes.func.isRequired,
};

export default Home;