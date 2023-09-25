import PropTypes from 'prop-types';
import LinkButton from '../../UI/LinkButton/LinkButton';
import { formatValues } from '../../../helpers/formatValues';

function Company(props) {

  let benefitsArray = formatValues(props.benefits || []);
  benefitsArray = benefitsArray.split(', ')

  const clickHandler = () => {
    props.onOpen(props);
  };

  return (
    <div className='card mb-3 bg-light'>
      <div className='card-body'>
        <div className='row'>
          <div className='col-5 col-md-5 align-self-center'>
            <img 
              src={`https://picsum.photos/id/${Math.floor(Math.random() * 50)}/450/300`}
              alt='company-logo'
              className='img-thumbnail' />
          </div>
          <div className='col-7 col-md-7 py-2'>
            <div className='row mx-0 me-md-4 h-100 py-md-3 align-items-between'>
              <div className='col-8 col-md-9 p-0 text-center'>
                <h3 className='m-0 p-0'>{props.name}</h3>
                <p>{props.city}</p>
              </div>
              <div className='col-4 col-md-3 text-end'>
                <h4>
                  <span className='badge bg-dark text-light h2'>{props.rating ?? '0.0'}</span>
                </h4>
              </div>
              <div className='d-none d-md-block col-md-9 text-start'>
                    <p><strong>Employees:</strong> {props.employees}</p>
                    <p><strong>Industry:</strong> {formatValues(props.industry)}</p>
                    <p><strong>Benefits: </strong>{props.benefits ? 'Yes' : 'No'}</p>
                    <p><strong>Recruitment pocess: </strong>
                      <span className={props.status === 'active' ? 'badge bg-success' : 'badge bg-danger'}>
                        {formatValues(props.status)}
                      </span>
                    </p>
              </div>
              <div className='col-12 col-md-3 text-end align-self-end'>
                <LinkButton 
                  onClick={clickHandler}
                  to={`/companies/${props.id}`}>
                    Open
                </LinkButton> 
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

Company.propTypes = {
  name: PropTypes.string.isRequired,
  city: PropTypes.string.isRequired,
  industry: PropTypes.string.isRequired,
  employees: PropTypes.string.isRequired,
  benefits: PropTypes.array,
  status: PropTypes.string,
  onOpen: PropTypes.func.isRequired,
};

export default Company;