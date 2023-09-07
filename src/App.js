import { Component } from 'react';
import './App.css';
import Layout from './components/Layout/Layout';
import Header from './components/Header/Header';
import Menu from './components/Menu/Menu';
import Companies from './components/Companies/Companies';
import Footer from './components/Footer/Footer';
import SearchBar from './components/UI/SearchBar/SearchBar';
import ThemeButton from './components/UI/ThemeButton/ThemeButton';
import ThemeContext from './context/themeContext';

const backendCompanies= [
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
  }, , 
];

class App extends Component {
  
  constructor() {
    super();
    
    this.state = {
      companies: backendCompanies,
      theme: 'primary',
    };
  };

  static contextType = ThemeContext;

  search(term) {
    const companies = backendCompanies.filter(company => company.name.toLowerCase().includes(term.toLowerCase())); 
    this.setState({companies});
  };

  changeTheme() {
    const theme = (this.state.theme === 'primary') ? 'warning' : 'primary';
    this.setState({ theme });
  };
  
  render() {

    const header = (
      <Header>
        <SearchBar onSearch={(term) => this.search(term)}/>
        <ThemeButton />
      </Header>
    );
    const content = (
      <Companies companies={this.state.companies} />
    );
    const menu = <Menu />
    const footer = <Footer />

    return (
      <div className='app'>
        <ThemeContext.Provider value={{
          color: this.state.theme,
          onChange: () => this.changeTheme(),
        }}>
          <Layout 
            header={header}
            content={content}
            menu={menu}
            footer={footer}
            />
        </ThemeContext.Provider>
      </div>
    );
  };
};

export default App;
