import { useReducer } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
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
import Profile from './pages/Profile/Profile';
import Company from './pages/Company/Company';
import Search from './pages/Search/Search';

function App() {

  const [state, dispatch] = useReducer(reducer, initialState);

  const header = (
    <Header>
      <SearchBar />
      <ThemeButton />
    </Header>
  );
  const content = ( 
    <Switch>
      <Route path='/profile' component={Profile} />
      <Route path='/search' exact component={Search} />
      <Route path='/companies/:id' component={Company} />
      <Route path='/' component={Home} />
    </Switch>
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
