import { useState, useContext, useRef } from 'react';
import Modal from 'react-modal';
import PropTypes from 'prop-types';
import styles from './ModalButton.module.css';
import ThemeContext from '../../../context/themeContext';

const customStyles = {
  content: {
    top: '50%',
    left: '50%',
    right: 'auto',
    bottom: 'auto',
    marginRight: '-50%',
    transform: 'translate(-50%, -50%)',
  },
  overlay: {
    position: 'fixed',
    zIndex: 1030,
  },
};

Modal.setAppElement('#root');

function ModalButton(props) {
  const [modalIsOpen, setIsOpen] = useState(false);
  const [password, setPassword] = useState('');
  const { color } = useContext(ThemeContext);

  const buttonRef = useRef(null);
  const inputRef = useRef(null);

  const submit = () => {
    props.onSubmit(password);
    closeModal();
  };

  const onKeyDownHanler = (e) => {
    if (e.key === 'Enter') {
      buttonRef.current.click();
    };
  };

  const openModal = () => {
    setIsOpen(true);
  };

  const afterOpenModal = () => {
    inputRef.current.focus();
  };

  const closeModal = () => {
    setPassword('');
    setIsOpen(false);
  };

  return (
    <div>
      {props.loading
        ? <button className={`mt-2 btn btn-${color} ${styles.button}`}>
            <div className='spinner-border' role="status">
              <span className="visually-hidden">Loading...</span>
            </div>
          </button>
        : <button onClick={openModal} disabled={props.disabled} className={`mt-2 btn btn-${color} ${styles.button}`}>{props.children}</button>
      }
      <Modal
        isOpen={modalIsOpen}
        onAfterOpen={afterOpenModal}
        onRequestClose={closeModal}
        style={customStyles}
        contentLabel="Example Modal"
      >
        <div className={`modal-dialog ${styles.modal}`} role="password confirmation" id="modal">
          <div className="modal-content">
            <div className="modal-header">
              <h1 className="modal-title fs-4">Confirm your identity!</h1>
              <button onClick={closeModal} type="button" className="btn-close align-self-start" aria-label="Close"></button>
            </div>
            <div className="modal-body mt-3">
              <p className='text-muted mb-2'>Please insert your authenticated password!</p>
              <div>
                <input 
                  value={password} 
                  onChange={e => setPassword(e.target.value)}
                  onKeyDown={onKeyDownHanler}
                  ref={inputRef}
                  type="password" 
                  placeholder="Password" 
                  id="passwordInput"
                  className="form-control"/>
              </div>
            </div>
            <div className="modal-footer mt-4">
              <button onClick={closeModal} type="button" className="btn btn-secondary">Close</button>
              <button 
                onClick={submit} 
                ref={buttonRef}
                type="button" 
                disabled={password ? false : true}
                className={`ms-1 btn btn-${color}`} 
              >
                Confirm
              </button>
            </div>
          </div>
        </div>
      </Modal>
    </div>
  );
};

ModalButton.propTypes = {
  loading: PropTypes.bool.isRequired,
  disabled: PropTypes.bool,
  onSubmit: PropTypes.func,
};

export default ModalButton;