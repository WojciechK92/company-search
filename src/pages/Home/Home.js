import { useEffect, useState } from 'react';
import Companies from '../../components/Companies/Companies';
import SpecilOffer from '../../components/SpecialOffer/SpecialOffer';
import LastCompany from '../../components/Companies/LastCompany/LastCompany';
import useStateStorage from '../../hooks/useStateStorage';
import LoadingIcon from '../../components/UI/LoadingIcon/LoadingIcon';

const backendCompanies = [
  {
    id: 1,
    name: 'Sitaniec Technology',
    city: 'Zamość',
    industry: 'Automation',
    employees: 45,
    rating: 8.8,
  }, 
  {
    id: 2,
    name: 'Cewar',
    city: 'Lublin',
    industry: 'Trade',
    employees: 87,
    rating: 6.2,
  },
  {
    id: 3,
    name: 'Energoremont',
    city: 'Krasnystaw',
    industry: 'Production',
    employees: 89,
    rating: 5.9,
  }, 
];

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

  useEffect(() => {
    setTimeout(() => {
      //loading from backend
      setCompanies(backendCompanies);
      setLoading(false);
    }, 300);
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