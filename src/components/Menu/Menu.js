import { NavLink, Link } from 'react-router-dom';
import useAuth from '../../hooks/useAuth';
import PropTypes from 'prop-types';
import withMouseEffect from '../../hoc/withMouseEffect';

const Menu = (props) => {

  const [auth, setAuth] = useAuth();
  
  const logout = (e) => {
    e.preventDefault();
    setAuth(false);
  };

  const innerWidth = window.innerWidth;
  const number = innerWidth/100;
  const valueX = Math.floor(0 + props.mouseX/number);
  const background = {
    background: `linear-gradient(35deg, rgba(240,240,240,1) ${valueX}%, rgba(190,190,190,1) 100%)`,
  };
  
  return (
    <nav style={background} className='mb-3 navbar navbar-expand-md bg-body-tertiary' >
      <div className="container-fluid ms-3">
        <Link className="navbar-brand" to="/">
          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" className="bi bi-buildings" viewBox="0 0 16 16">
            <path d="M14.763.075A.5.5 0 0 1 15 .5v15a.5.5 0 0 1-.5.5h-3a.5.5 0 0 1-.5-.5V14h-1v1.5a.5.5 0 0 1-.5.5h-9a.5.5 0 0 1-.5-.5V10a.5.5 0 0 1 .342-.474L6 7.64V4.5a.5.5 0 0 1 .276-.447l8-4a.5.5 0 0 1 .487.022ZM6 8.694 1 10.36V15h5V8.694ZM7 15h2v-1.5a.5.5 0 0 1 .5-.5h2a.5.5 0 0 1 .5.5V15h2V1.309l-7 3.5V15Z"/>
            <path d="M2 11h1v1H2v-1Zm2 0h1v1H4v-1Zm-2 2h1v1H2v-1Zm2 0h1v1H4v-1Zm4-4h1v1H8V9Zm2 0h1v1h-1V9Zm-2 2h1v1H8v-1Zm2 0h1v1h-1v-1Zm2-2h1v1h-1V9Zm0 2h1v1h-1v-1ZM8 7h1v1H8V7Zm2 0h1v1h-1V7Zm2 0h1v1h-1V7ZM8 5h1v1H8V5Zm2 0h1v1h-1V5Zm2 0h1v1h-1V5Zm0-2h1v1h-1V3Z"/>
          </svg>
        </Link>
        <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse justify-content-between" id="navbarNav">
          <ul className="navbar-nav gap-md-3 ms-md-3">
            <li className="nav-item">
              <NavLink className="nav-link" to="/" exact>Home</NavLink>
            </li>
            {auth
              ? <li className="nav-item">
                  <NavLink className="nav-link" to="/profile">My profile </NavLink>
                </li>
              : null
            }
          </ul>
          <ul className="navbar-nav gap-md-4 me-md-4">
            {auth 
              ? (
                <li className="nav-item">
                  <a className="nav-link" href="#" onClick={logout}>Log out</a>
                </li>
              ) : (
                <>
                  <li className="nav-item">
                    <NavLink className="nav-link" to="/login">Log in</NavLink>
                  </li>
                  <li className="nav-item">
                    <NavLink className="nav-link" to="/register">Register</NavLink>
                  </li>
                </>
              )}
          </ul>
        </div>
      </div>
    </nav>
  );
};

Menu.propTypes = {
  mouseX: PropTypes.any.isRequired,
  mouseY: PropTypes.any,
}

export default withMouseEffect(Menu);