import { useState } from 'react';
import axios from '../../../axios';
import ModalInfo from '../../../components/UI/ModalInfo/ModalInfo';
import CompanyForm from '../CompanyForm';
import useWebTitle from '../../../hooks/useWebsiteTitle';
import useAuth from '../../../hooks/useAuth';

function AddCompany() {
 
  const [success, setSuccess] = useState(false);
  const [auth] = useAuth();
  useWebTitle('Company Search - Add company');

  const submit = async (data) => {
    await axios.post(`/companies.json?auth=${auth.stsTokenManager.accessToken}`, data);
    setSuccess(true);
  };

  return success
    ? <ModalInfo to='/profile/companies' label='Successful!' time={3000} >
        <p>You will be redirected to the my companies page!</p>
      </ModalInfo>
    : <CompanyForm 
      label='Add company' 
      buttonText='Add'
      onSubmit={submit} /> 
};

export default AddCompany;