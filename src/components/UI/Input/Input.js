import PropTypes from 'prop-types';

const Input = (props) => {
  
  const expression = props.form.error
    ? (props.form.showError ? 'is-invalid' : '')
    : (props.form.showError && props.form.value ? 'is-valid' : '');
  
  switch (props.type) {
    case 'text':
    case 'number':
      return (
        <div className='mb-3'>
          <label className='form-label'>{props.label}</label>
          <input 
            value={props.value}
            onChange={e => props.onChange(e.target.value)}
            type={props.type} 
            className={`form-control ${expression}`} />
          <div className='invalid-feedback mt-2'>
            {props.form.error} 
          </div>
        </div>
      );
    case 'select':
      return (
        <div className='mb-3'>
          <label className='form-label'>{props.label}</label>
          <select 
            value={props.value}
            onChange={e => props.onChange(e.target.value)}
            className={`form-control ${expression}`}>
              {props.options.map(option => ( 
                <option key={option.name} value={option.name}>{option.label}</option>
              ))}
          </select>
          <div className='invalid-feedback mt-2'>
            {props.form.error}
          </div>
        </div>
      );
    case 'checkbox':
      return (
        <div className='mb-3'>
          <p className='mb-1'>{props.label}</p>
          {props.options.map(option => (
            <div key={option.name} className='form-check'>
              <input 
                checked={props.form.value.includes(option.name)}
                onChange={e => props.onChange(e)}
                type={props.type}
                id={option.name}
                name={option.name}
                className='form-check-input'/>
              <label htmlFor={option.name} className='form-check-label'>{option.label}</label>
            </div>
          ))}
        </div>
      );
    case 'radio':
      return (
        <div className='mb-3'>
          <p className='mb-1'>{props.label}</p>
          {props.options.map(option => (
            <div key={option.name} className='form-radio'>
              <input 
                checked={props.form.value === option.name}
                onChange={e => props.onChange(e.target.id)}
                type={props.type}
                id={option.name}
                name={props.name}
                className='form-radio-input' />
              <label htmlFor={option.name} className='form-radio-label'>{option.label}</label>
            </div>
          ))}
        </div>
      );
    default: 
      throw new Error("This type of input doesn't exist");
  };
};

Input.defaultProps = {
  type: 'text',
};

Input.propTypes = {
  label: PropTypes.string.isRequired,
  type: PropTypes.string.isRequired,
  name: PropTypes.string,
  option: PropTypes.array,
  value: PropTypes.string,
  onChange: PropTypes.func.isRequired,
  form: PropTypes.object.isRequired,
};

export default Input;