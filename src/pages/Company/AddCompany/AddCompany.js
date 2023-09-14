import { useState } from 'react';
import { useHistory } from 'react-router-dom';
import Input from '../../../components/UI/Input/Input';
import LoadingButton from '../../../components/UI/LoadingButton/LoadingButton';
import { changeHandler, checkValid } from '../../../helpers/validations';

function AddCompany() {
  const [loading, setLoading] = useState(false);
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

  const submit = (e) => {
    e.preventDefault();
    setLoading(true);

    setTimeout(() => {
      setLoading(false); 
    }, 500);
  };

  return (
    <div className='card'>
      <div className='card-body'>
        <h2 className='mb-4'>Add company</h2>
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