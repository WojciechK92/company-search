import { Route, Redirect } from 'react-router-dom';
import PropTypes from 'prop-types';
import useAuth from '../hooks/useAuth';

function AuthenticatedRoute(props) { 
  const [auth] = useAuth();

  return auth 
    ? <Route path={props.path} component={props.component} /> 
    : <Redirect to='/' />
};

AuthenticatedRoute.propTypes = {
  component: PropTypes.object.isRequired,
  path: PropTypes.string.isRequired,
};

export default AuthenticatedRoute;