import { useEffect, useState } from 'react';
import { useHistory, useParams } from 'react-router-dom';
import axios from '../../../axios';
import SuccessMessage from '../../../components/Other/SuccessMessage/SuccessMessage';
import CompanyForm from '../CompanyForm';

function EditCompany() {
  const [success, setSuccess] = useState(false);
  const [company, setCompany] = useState(null);
  const history = useHistory();
  const { id } = useParams();

  const fetchCompany = async () => {
    const res = await axios.get(`/companies/${id}.json`);
    setCompany(res.data);
  };

  const submit = async (data) => {
    await axios.patch(`/companies/${id}.json`, data);
    
    setSuccess(true);
    setTimeout(() => {
      history.push('/profile/companies');
    }, 3000);
    
  };
  
  useEffect(() => {
    fetchCompany();
  }, [id]);
  
  return success
    ? <SuccessMessage redirect='My companies' />
    : <CompanyForm 
      company={company} 
      label='Edit company' 
      buttonText='Save'
      onSubmit={submit} />
};

export default EditCompany;