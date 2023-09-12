import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import LoadingIcon from '../../components/UI/LoadingIcon/LoadingIcon';

const backendCompany = {
  id: 2,
  name: 'Cewar',
  city: 'Lublin',
  industry: 'Trade',
  employees: 87,
  rating: 6.2,
};

function Company() {
  const [company, setCompany] = useState(null);
  const [loading, setLoading] = useState(true);

  const { id } = useParams();

  useEffect(() => {
    setTimeout(() => {
      // loading from backend
  
      setCompany(backendCompany);
      setLoading(false);
    }, 1000);  
  }, []);

  return loading 
    ? <LoadingIcon />
    : <div className='card'>
        <div className='card-header'>
          <h3>{company.name}</h3>
        </div>
      </div>
};

export default Company;