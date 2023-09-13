import { useReducer, lazy, Suspense } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import AuthenticatedRoute from './hoc/AuthenticatedRoute';
import './App.css';
import Layout from './components/Layout/Layout';
import Header from './components/Header/Header';
import Menu from './components/Menu/Menu';
import Footer from './components/Footer/Footer';
import SearchBar from './components/UI/SearchBar/SearchBar';
import ThemeButton from './components/UI/ThemeButton/ThemeButton';
import ThemeContext from './context/themeContext';
import AuthContext from './context/authContext';
import { reducer, initialState } from './reducer';
import Home from './pages/Home/Home';
import Company from './pages/Company/Company';
import Search from './pages/Search/Search';
import NotFound from './pages/NotFound/NotFound';
import ErrorBoundary from './hoc/ErrorBoundary';
import Login from './pages/Auth/Login';
import Register from './pages/Auth/Register';
import AddCompany from './pages/Company/AddCompany/AddCompany';
const Profile = lazy(() => import('./pages/Profile/Profile'));

function App() {

  const [state, dispatch] = useReducer(reducer, initialState);

  const header = (
    <Header>
      <SearchBar />
      <ThemeButton />
    </Header>
  );
  const content = ( 
    <ErrorBoundary>
      <Suspense fallback={<div>Loading...</div>}>
        <Switch>
          <AuthenticatedRoute path='/profile/companies/add' component={AddCompany} />
          <AuthenticatedRoute path='/profile' component={Profile} />
          <Route path='/register' component={Register} />
          <Route path='/login' component={Login} />
          <Route path='/search' exact component={Search} />
          <Route path='/companies/:id' component={Company} />
          <Route path='/' exact component={Home} />
          <Route component={NotFound} />
        </Switch>
      </Suspense>
    </ErrorBoundary>
  );
  const menu = <Menu />
  const footer = <Footer />

  return (
    <Router>
      <AuthContext.Provider value={{
        isAuthenticated: state.isAuthenticated,
        login: () => dispatch({ type: 'login' }),
        logout: () => dispatch({ type: 'logout' }),
      }}>
        <ThemeContext.Provider value={{
          color: state.theme,
          onChange: () => dispatch({ type: 'change-theme' }),
        }}>
          <Layout 
            header={header}
            content={content}
            menu={menu}
            footer={footer}
            />
        </ThemeContext.Provider>
      </AuthContext.Provider>
    </Router>
  );
};

export default App;
