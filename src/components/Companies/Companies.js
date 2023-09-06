import { Component } from 'react';
import Company from './Company/Company';

class Companies extends Component {
  render() {
    return (
      <div>
        Companies
        {this.props.companies.map(company => 
          <Company {...company}/> 
        )}
      </div>
    );
  };
};

export default Companies;