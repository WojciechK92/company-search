import PropTypes from 'prop-types';

function LastCompany(props) {
  
  return (
    <div>
      {props.company.name}
    </div>
  );
};

LastCompany.propTypes = {
  company: PropTypes.object.isRequired,
};

export default LastCompany;