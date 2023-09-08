import PropTypes from 'prop-types';
import Company from './Company/Company';

function Companies(props) {
  return (
    <div className='container-fluid'>
      {props.companies.map(company => 
        <Company 
          {...company}
          key={company.id} /> 
      )}
    </div>
  );
};

Companies.propTypes = {
  companies: PropTypes.array.isRequired,
};

export default Companies;