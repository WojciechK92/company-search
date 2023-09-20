import { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import PropTypes from 'prop-types';
import Input from '../../components/UI/Input/Input';
import LoadingButton from '../../components/UI/LoadingButton/LoadingButton';
import Button from '../../components/UI/Button/Button';
import { changeHandler, checkValid } from '../../helpers/validations';
import useAuth from '../../hooks/useAuth';

function CompanyForm(props) {
  const [loading, setLoading] = useState(false);
  const [resError, setResError] = useState('');
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

  const submit = (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      if (checkValid(form)) {
        props.onSubmit({
          name: form.name.value,
          city: form.city.value,
          industry: form.industry.value,
          employees: form.employees.value,
          benefits: form.benefits.value,
          status: form.status.value,
          user_id: auth.userId,
        });
      };
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

  useEffect(() => {
    if (props.company) {
      let newForm = {};
      for (const key in form) {
        if (Array.isArray(form[key].value) && !props.company[key]) {
          newForm[key] = {...form[key], value: [], valid: true}; 
        } else {
          newForm[key] = {...form[key], value: props.company[key], valid: true}; 
        };
      };
      setForm(newForm);
    };
  }, [props.company]);

  const cancel = (e) => {
    e.preventDefault();
    history.goBack();
  };

  return (
    <div className='card'>
      <div className='card-header py-3'>
        <h2>{props.label}</h2>
      </div>
      <div className='card-body'>
        {resError
          ? <div className='alert alert-danger py-3'>{resError}</div>
          : null
        }
        <p className='text-muted'>Enter your company datails</p> 
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

          <div className='d-flex gap-4'>
            <LoadingButton loading={loading} disabled={!checkValid(form)}>{props.buttonText}</LoadingButton>
            <Button onClick={cancel}>Cancel</Button>
          </div>
        </form>
      </div>
    </div>
  );
};

CompanyForm.propTypes = {
  label: PropTypes.string.isRequired,
  buttonText: PropTypes.string.isRequired,
  onSubmit: PropTypes.func.isRequired,
  company: PropTypes.object,
};

export default CompanyForm;