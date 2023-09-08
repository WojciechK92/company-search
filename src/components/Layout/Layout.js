import PropTypes from 'prop-types';

const Layout = (props) => {
  return (
    <div>
      <div>{props.header}</div>
      <div className='sticky-top'>{props.menu}</div>
      <div>{props.content}</div>
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