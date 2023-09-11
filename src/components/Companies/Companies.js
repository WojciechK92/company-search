import PropTypes from 'prop-types';
import Company from './Company/Company';

function Companies(props) {
  return (
    <div className='container-fluid'>
      {props.companies.map(company => 
        <Company key={company.id} {...company} onOpen={props.onOpen} /> 
      )}
    </div>
  );
};

Companies.propTypes = {
  companies: PropTypes.array.isRequired,
  onOpen: PropTypes.func.isRequired,
};

export default Companies;