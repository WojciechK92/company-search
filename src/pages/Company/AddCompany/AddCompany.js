import { useState } from 'react';
import { useHistory } from 'react-router-dom';
import axios from '../../../axios';
import SuccessMessage from '../../../components/Other/SuccessMessage/SuccessMessage';
import CompanyForm from '../CompanyForm';

function AddCompany() {
 
  const [success, setSuccess] = useState(false);
  const history = useHistory();

  const submit = async (data) => {
    await axios.post('/companies.json', data);
    setSuccess(true);
    setTimeout(() => {
      history.push('/profile/companies');
    }, 3000);
  };

  return success
    ? <SuccessMessage redirect='My companies' />
    : <CompanyForm 
      label='Add company' 
      buttonText='Add'
      onSubmit={submit} /> 
};

export default AddCompany;