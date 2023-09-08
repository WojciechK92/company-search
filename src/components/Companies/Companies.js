import { Component } from 'react';
import PropTypes from 'prop-types';
import Company from './Company/Company';

class Companies extends Component {
  render() {
    return (
      <div className='container-fluid'>
        {this.props.companies.map(company => 
          <Company key={company.id} {...company} /> 
        )}
      </div>
    );
  };
};

Companies.propTypes = {
  companies: PropTypes.array.isRequired,
};

export default Companies;