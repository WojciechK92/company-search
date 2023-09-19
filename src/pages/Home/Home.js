import { useEffect, useState } from 'react';
import Companies from '../../components/Companies/Companies';
import SpecilOffer from '../../components/SpecialOffer/SpecialOffer';
import LastCompany from '../../components/Companies/LastCompany/LastCompany';
import useStateStorage from '../../hooks/useStateStorage';
import LoadingIcon from '../../components/UI/LoadingIcon/LoadingIcon';
import axios from '../../axios';
import objectToArrayWithId from '../../helpers/objectToArrayWithId';

function Home() {

  const [lastCompany, setLastCompany] = useStateStorage('last-company', null);
  const [companies, setCompanies] = useState([]);  
  const [loading, setLoading] = useState(true);

  const lastCompanyOpened = (lastCompany) => {
    setLastCompany(lastCompany); 
  };

  const removeLastCompany = () => {
    setLastCompany(null);
  };

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
        {lastCompany 
          ? <LastCompany lastCompany={lastCompany} onRemove={removeLastCompany} /> 
          : null}
        <Companies 
          companies={companies} 
          onOpen={lastCompanyOpened} />
      </>
};

export default Home;