import PropTypes from 'prop-types';

function LastCompany(props) {

  const removeLastCompany = (e) => {
    e.preventDefault();
    props.onRemove();
  };
  
  return (
    <div className='card m-3'>
      <div className='card-header text-center'>
        <p className='h3'>You recently viewed this company!</p>
      </div>
      <div className='card-body row gap-4 px-4 px-md-5'>
        <div className='col-12'>
          <div className='row align-items-center'>
            <h4 className='col-7 text-start mb-0 card-title'>{props.lastCompany.name}</h4> 
            <p className='col-5 text-end card-text'>{props.lastCompany.city}</p> 
          </div>
        </div>
        <div className='col-12'>
          <div className='row align-items-center'>
            <p className='col-7 text-start mb-0'>Do you want to see it again?</p>
            <div className='col-5 text-end'>
              <a href='#' className='me-4 btn btn-dark text-light'>YES</a>
              <button 
                onClick={removeLastCompany}
                className='btn btn-dark text-light'>
                  NO
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

LastCompany.propTypes = {
  lastCompany: PropTypes.object.isRequired,
  onRemove: PropTypes.func.isRequired,
};

export default LastCompany;