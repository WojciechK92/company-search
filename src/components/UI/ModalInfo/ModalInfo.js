import { useState, useEffect, useContext, useRef } from 'react';
import { useHistory } from 'react-router-dom';
import PropTypes from 'prop-types';
import Modal from 'react-modal';
import styles from './ModalInfo.module.css';
import ThemeContext from '../../../context/themeContext';
import useAuth from '../../../hooks/useAuth';

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
  const history = useHistory();
  const [auth, setAuth] = useAuth();
  const { color } = useContext(ThemeContext);
  const buttonRef = useRef(null);

  const openModal = () => {
    setIsOpen(true);
  };
  
  const afterOpenModal = () => {
    if (props.buttonText) document.body.addEventListener('keydown', keyDownHandler);
  };
  
  const closeModal = () => {
    setIsOpen(false);
    document.body.removeEventListener('keydown', keyDownHandler);
    props.buttonText ? setAuth(null) : history.push(props.to);
  };
  
  const keyDownHandler = e => {
    if (e.key === 'Enter') {
      buttonRef.current.click();
    };
  };
  
  useEffect(() => {
    openModal();
    
    const timer1 = setTimeout(() => {
      closeModal();
    }, props.time);
    
    
    return () => {
      clearTimeout(timer1);
    };

  }, []);
  
  return (
      <Modal
        isOpen={modalIsOpen}
        onAfterOpen={afterOpenModal}
        onRequestClose={closeModal}
        style={customStyles}
        contentLabel="Modal"
        shouldCloseOnOverlayClick={false}
      >
        <div className={`modal-dialog text-center ${styles.modal}`} role="success information" id="modal-dialog">
          <div className="modal-content">
            <div className="modal-header justify-content-center">
              <h1 className="modal-title fs-3">{props.label}</h1>
            </div>
            <div className="modal-body mt-3">
              <div className="text-muted mb-4">{props.children}</div>
              {props.buttonText
                ? <button onClick={closeModal} ref={buttonRef} className={`btn btn-${color}`}>{props.buttonText}</button>
                : null
              }
            </div>
          </div>
        </div>
      </Modal>
  );
};

ModalButton.propTypes = {
  to: PropTypes.string.isRequired,
  label: PropTypes.string.isRequired,
  time: PropTypes.number.isRequired,
  buttonText: PropTypes.string,
};

export default ModalButton;