import { useState } from 'react';
import { useHistory } from 'react-router-dom';
import Input from '../../../components/UI/Input/Input';
import LoadingButton from '../../../components/UI/LoadingButton/LoadingButton';
import { changeHandler, checkValid } from '../../../helpers/validations';
import axios from '../../../axios';
import useAuth from '../../../hooks/useAuth';
import SuccessMessage from '../../../components/Other/SuccessMessage/SuccessMessage';

function AddCompany() {
  const [loading, setLoading] = useState(false);
  const [resError, setResError] = useState('');
  const [success, setSuccess] = useState(false);
  const [auth] = useAuth();
  const history = useHistory();
  const [form, setForm] = useState({
    name: {
      value: '',
      error: '',
      showError: true,
      valid: false,
      rules: ['required'],
    },
    city: {
      value: '',
      error: '',
      showError: true,
      valid: false,
      rules: ['required'],
    },
    industry: {
      value: '',
      error: '',
      showError: true,
      valid: false,
      rules: ['required'],
    },
    employees: {
      value: '',
      error: '',
      showError: true,
      valid: false,
      rules: ['required', 'positive', 'integer'],
    },
    benefits: {
      value: [],
      error: '',
      showError: true,
      valid: true,
      rules: [],
    },
    status: {
      value: 'inactive',
      error: '',
      showError: true,
      valid: true,
      rules: [],
    },
  });

  const checkHandler = (e) => {
    let newValue;
    if (e.target.checked) {
      newValue = [...form.benefits.value, e.target.name]
    } else {
      newValue = form.benefits.value.filter(b => b !== e.target.name);
    };
    setForm({...form, benefits: {...form.benefits, value: newValue}}) 
  };

  const submit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      await axios.post('/companies.json', {
        name: form.name.value,
        city: form.city.value,
        industry: form.industry.value,
        employees: form.employees.value,
        benefits: form.benefits.value,
        status: form.status.value,
        user_id: auth.userId,
      });

      setSuccess(true);
      setTimeout(() => {
        history.push('/profile/companies');
      }, 3000);
      
    } catch(ex) {
      setLoading(false); 
      setResError(ex.response.data.error.message);

      setForm({...form, 
        name: {...form.name, error: '', valid: true}, 
        city: {...form.city, error: '', valid: true},
        industry: {...form.industry, error: '', valid: true},
        employees: {...form.employees, error: '', valid: true},
      });
    };
  };

  if (success) return <SuccessMessage redirect='My companies' />;

  return (
    <div className='card'>
      <div className='card-body'>
        <h2 className='mb-4'>Add company</h2>
        {resError
          ? <div className='alert alert-danger py-3'>{resError}</div>
          : null 
        }
        <form onSubmit={submit}>
          <Input 
            value={form.name.value}
            onChange={value => changeHandler(form, setForm, value, 'name')}
            type='text' 
            label='Name'
            form={{...form.name}} /> 

          <Input 
            value={form.city.value}
            onChange={value => changeHandler(form, setForm, value, 'city')}
            type='text' 
            label='City' 
            form={form.city} />

          <Input 
            value={form.industry.value}
            onChange={value => changeHandler(form, setForm, value, 'industry')}
            type='select' 
            label='Industry'
            form={form.industry} 
            options={[
              {name: '', label: '--Please choose an option--'},
              {name: 'automation', label: 'Automation'},
              {name: 'automotive', label: 'Automotive'},
              {name: 'construction', label: 'Construction'},
              {name: 'machines', label: 'Machines'},
              {name: 'medicine', label: 'Medicine'},
              {name: 'production', label: 'Production'},
            ]} /> 
            
          <Input 
            value={form.employees.value}
            onChange={value => changeHandler(form, setForm, value, 'employees')}
            type='number' 
            label='Number of employees' 
            form={form.employees} /> 

          <Input 
            onChange={e => checkHandler(e)}
            type='checkbox' 
            label='Benefits for employees' 
            form={form.benefits} 
            options={[
              {name: 'multisportCard', label: 'Multisport Card'}, 
              {name: 'playroom', label: 'Playroom'}, 
              {name: 'medicalPackage', label: 'Medical package'}, 
              {name: 'fruitThursdays', label: 'Fruit Thursdays'}, 
            ]}
            />
          
          <Input 
            onChange={(value) => changeHandler(form, setForm, value, 'status')}
            type='radio'
            label='Recruitment process'
            name='status'
            form={form.status}
            options={[
              { name: 'active', label: 'Active'},
              { name: 'inactive', label: 'Inactive'},
            ]} />

          <LoadingButton loading={loading} disabled={!checkValid(form)}>Add</LoadingButton>
        </form>
      </div>
    </div>
  );
};

export default AddCompany;