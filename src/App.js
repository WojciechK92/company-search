import { Component } from 'react';
import './App.css';
import Layout from './components/Layout/Layout';
import Header from './components/Header/Header';
import Menu from './components/Menu/Menu';
import Companies from './components/Companies/Companies';
import Footer from './components/Footer/Footer';

class App extends Component {

  constructor() {
    super();

    this.state = {
      companies: [
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
      ]
    };
  };

  render() {

    const header = <Header />
    const content = <Companies companies={this.state.companies}/>
    const menu = <Menu />
    const footer = <Footer />

    return (
      <div className='app'>
        <Layout 
          header={header}
          content={content}
          menu={menu}
          footer={footer}
        />
      </div>
    );
  };
};

export default App;
