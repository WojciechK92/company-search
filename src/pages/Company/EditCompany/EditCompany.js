import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from '../../../axios';
import SuccessMessage from '../../../components/Other/SuccessMessage/SuccessMessage';
import CompanyForm from '../CompanyForm';
import useWebTitle from '../../../hooks/useWebsiteTitle';

function EditCompany() {
  const [success, setSuccess] = useState(false);
  const [company, setCompany] = useState(null);
  const { id } = useParams();
  useWebTitle('Company Search - Edit company');

  const fetchCompany = async () => {
    const res = await axios.get(`/companies/${id}.json`);
    setCompany(res.data);
  };

  const submit = async (data) => {
    await axios.patch(`/companies/${id}.json`, data);
    setSuccess(true);
  };
  
  useEffect(() => {
    fetchCompany();
  }, [id]);
  
  return success
    ? <SuccessMessage to='/profile/companies' redirect='My companies' />
    : <CompanyForm 
      company={company} 
      label='Edit company' 
      buttonText='Save'
      onSubmit={submit} />
};

export default EditCompany;