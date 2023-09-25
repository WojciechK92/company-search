import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from '../../../axios';
import ModalInfo from '../../../components/UI/ModalInfo/ModalInfo'
import CompanyForm from '../CompanyForm';
import useWebTitle from '../../../hooks/useWebsiteTitle';
import useAuth from '../../../hooks/useAuth';

function EditCompany() {
  const [success, setSuccess] = useState(false);
  const [company, setCompany] = useState(null);
  
  const { id } = useParams();
  const [auth] = useAuth();
  useWebTitle('Company Search - Edit company');

  const fetchCompany = async () => {
    const res = await axios.get(`/companies/${id}.json`);
    setCompany(res.data);
  };

  const submit = async (data) => {
    await axios.patch(`/companies/${id}.json?auth=${auth.stsTokenManager.accessToken}`, data);
    setSuccess(true);
  };
  
  useEffect(() => {
    fetchCompany();
  }, [id]);
  
  return success
    ? <ModalInfo to='/profile/companies' label='Successful!' time={3000} >
        <p>You will be redirected to the my companies page!</p>
      </ModalInfo>
    : <CompanyForm 
      company={company} 
      label='Edit company' 
      buttonText='Save'
      onSubmit={submit} />
};

export default EditCompany;