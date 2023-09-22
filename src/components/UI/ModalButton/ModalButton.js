import { useContext, useState, useRef, useEffect } from 'react';
import PropTypes from 'prop-types';
import ThemeContext from '../../../context/themeContext';
import styles from './ModalButton.module.css';

function ModalButton(props) {

  const { color } = useContext(ThemeContext);
  const [password, setPassword] = useState('');
  const buttonRef = useRef(null);

  const submit = () => {
    props.onSubmit(password);
    setPassword('');
  };

  const onKeyDownHanler = (e) => {
    if (e.key === 'Enter') {
      buttonRef.current.click();
    };
  };
  
  useEffect(() => {
    const modal = document.getElementById('exampleModal');
    const passwordInput = document.getElementById('passwordInput');
    
    modal.addEventListener('shown.bs.modal', () => {
      passwordInput.focus();
    })
  }, []); 

  return props.loading 
    ? <button className={`mt-2 btn btn-${color} ${styles.button}`}>
        <div className='spinner-border' role="status">
          <span className="visually-hidden">Loading...</span>
        </div>
      </button>
    : <div>
        <button type="submit" disabled={props.disabled} className={`mt-2 btn btn-${color} ${styles.button}`} data-bs-toggle="modal" data-bs-target="#exampleModal">
          {props.children} 
        </button>
        <div className="modal fade" id="exampleModal" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
          <div className="modal-dialog">
            <div className="modal-content">
              <div className="modal-header">
                <h1 className="modal-title fs-5" id="exampleModalLabel">Confirm your identity!</h1>
                <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
              </div>
              <div className="modal-body">
                <p className='text-muted'>Please insert your authenticated password!</p>
                <div className="mt-4 mb-3">
                  <input 
                    value={password} 
                    onChange={e => setPassword(e.target.value)}
                    onKeyDown={onKeyDownHanler}
                    type="password" 
                    placeholder="Password" 
                    id="passwordInput"
                    className="form-control"/>
                </div>
              </div>
              <div className="modal-footer">
                <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                <button 
                  onClick={submit} 
                  ref={buttonRef}
                  type="button" 
                  disabled={password ? false : true}
                  className={`btn btn-${color}`} 
                  data-bs-dismiss="modal">
                    Confirm
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
};

ModalButton.propTypes = {
  loading: PropTypes.bool.isRequired,
  disabled: PropTypes.bool,
  onSubmit: PropTypes.func,
};

export default ModalButton;