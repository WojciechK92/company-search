import PropTypes from 'prop-types';
import styles from './Layout.module.css';

const Layout = (props) => {
  return (
    <div className={styles.layout}>
      <div>{props.header}</div>
      <div className='sticky-top'>{props.menu}</div>
      <div className='container-fluid px-4'>{props.content}</div>
      <div>{props.footer}</div>
    </div>
  );
};

Layout.propTypes = {
  header: PropTypes.object.isRequired,
  menu: PropTypes.object.isRequired,
  content: PropTypes.object.isRequired,
  footer: PropTypes.object.isRequired,
};

export default Layout;