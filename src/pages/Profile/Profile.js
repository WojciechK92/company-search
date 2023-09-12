import { NavLink, useRouteMatch, Route, Switch } from 'react-router-dom';
import ProfileDetails from './ProfileDetails/ProfileDetails';
import MyCompanies from '../Company/MyCompanies/MyCompanies';

function Profile() {
  const {url, path} = useRouteMatch();

  return (
    <div className='card'>
      <div className='card-header'>
        <h3>My profile</h3>
      </div>
      <div className='card-body p-4'>
        <ul className="nav nav-tabs">
          <li className="nav-item">
            <NavLink className="nav-link" to={url} exact>Edit my profile</NavLink>
          </li>
          <li className="nav-item">
            <NavLink className="nav-link" to={`${url}/companies`}>My companies</NavLink>
          </li>
        </ul>
        <div className='mt-3 py-2'>
          <Switch>
            <Route path={`${path}/companies`} component={MyCompanies} />
            <Route path={`${path}`} component={ProfileDetails} />
          </Switch>
        </div>
      </div>
    </div>
  );
};

export default Profile;