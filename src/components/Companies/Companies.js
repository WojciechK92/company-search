import { Component } from 'react';
import Company from './Company/Company';

class Companies extends Component {
  render() {
    return (
      <div className='container-fluid'>
        {this.props.companies.map(company => 
          <Company key={company.id} {...company}/> 
        )}
      </div>
    );
  };
};

export default Companies;