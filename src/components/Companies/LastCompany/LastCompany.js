import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import styles from './LastCompany.module.css';

function LastCompany(props) {

  const removeLastCompany = (e) => {
    e.preventDefault();
    props.onRemove();
  };
  
  return (
    <div className='card mb-3'>
      <div className='card-header text-center'>
        <h3>You recently viewed this company!</h3>
      </div>
      <div className='card-body'>
        <div className='row'>
          <div className='col-12'>
            <div className='d-flex align-items-center justify-content-between text-center'>
              <div className={styles.lastCompany}>
                <h4 className='card-title'>{props.lastCompany.name}</h4> 
                <p className='card-text'>{props.lastCompany.city}</p> 
              </div>
              <div className={styles.lastCompany}>
                <p className='card-text'>Do you want to see it again?</p>
                <Link to={`/companies/${props.lastCompany.id}`} className='me-4 btn btn-dark text-light'>YES</Link>
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
    </div>
  );
};

LastCompany.propTypes = {
  lastCompany: PropTypes.object.isRequired,
  onRemove: PropTypes.func.isRequired,
};

export default LastCompany;