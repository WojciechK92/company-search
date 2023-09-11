import { useEffect, useReducer } from 'react';
import './App.css';
import Layout from './components/Layout/Layout';
import Header from './components/Header/Header';
import Menu from './components/Menu/Menu';
import Companies from './components/Companies/Companies';
import Footer from './components/Footer/Footer';
import SearchBar from './components/UI/SearchBar/SearchBar';
import ThemeButton from './components/UI/ThemeButton/ThemeButton';
import LoadingIcon from './components/UI/LoadingIcon/LoadingIcon';
import ThemeContext from './context/themeContext';
import AuthContext from './context/authContext';
import { reducer, initialState } from './reducer';
import CheaperRegistration from './components/CheaperRegistration/CheaperRegistration';
import useStateStorage from './hooks/useStateStorage';
import LastCompany from './components/Companies/LastCompany/LastCompany';

const backendCompanies = [
  {
    id: 1,
    name: 'Sitaniec Technology',
    city: 'Zamość',
    industry: 'Automation',
    employees: 45,
    rating: 8.8,
  }, 
  {
    id: 2,
    name: 'Cewar',
    city: 'Lublin',
    industry: 'Trade',
    employees: 87,
    rating: 6.2,
  },
  {
    id: 3,
    name: 'Energoremont',
    city: 'Krasnystaw',
    industry: 'Production',
    employees: 89,
    rating: 5.9,
  }, 
];

function App() {

  const [state, dispatch] = useReducer(reducer, initialState);
  const [lastCompany, setLastCompany] = useStateStorage('last-company', null);

  const search = (term) => {
    const companies = backendCompanies.filter(company => company.name.toLowerCase().includes(term.toLowerCase())); 
    dispatch({ type: 'setCompanies', companies })
  };

  const lastCompanyOpened = (lastCompany) => {
    setLastCompany(lastCompany); 
  };
  const removeLastCompany = () => {
    setLastCompany(null);
  };

  useEffect(() => {
    setTimeout(() => {
      dispatch({ type: 'setCompanies', companies: backendCompanies })
      dispatch({ type: 'setLoading' }); 
    }, 1000);
  }, []);

  const header = (
    <Header>
      <SearchBar onSearch={(term) => search(term)}/>
      <ThemeButton />
    </Header>
  );
  const content = ( state.loading 
    ? <LoadingIcon />
    : <>
        <CheaperRegistration />
        {lastCompany 
          ? <LastCompany lastCompany={lastCompany} onRemove={removeLastCompany} /> 
          : null}
        <Companies 
          companies={state.companies} 
          onOpen={lastCompanyOpened} />
      </>
  );
  const menu = <Menu />
  const footer = <Footer />

  return (
    <div className='app'>
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
    </div>
  );
};

export default App;
