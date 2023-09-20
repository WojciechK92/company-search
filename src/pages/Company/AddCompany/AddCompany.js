import { useState } from 'react';
import axios from '../../../axios';
import SuccessMessage from '../../../components/Other/SuccessMessage/SuccessMessage';
import CompanyForm from '../CompanyForm';
import useWebTitle from '../../../hooks/useWebsiteTitle';

function AddCompany() {
 
  const [success, setSuccess] = useState(false);
  useWebTitle('Company Search - Add company');

  const submit = async (data) => {
    await axios.post('/companies.json', data);
    setSuccess(true);
  };

  return success
    ? <SuccessMessage to='/profile/companies' redirect='My companies' />
    : <CompanyForm 
      label='Add company' 
      buttonText='Add'
      onSubmit={submit} /> 
};

export default AddCompany;