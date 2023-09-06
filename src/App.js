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
          name: 'Sitaniec Technology',
          city: 'Zamość',
          industry: 'Automation',
          numberOfEmployees: 45,
          rating: 8,
        }, 
        {
          name: 'Cewar',
          city: 'Lublin',
          industry: 'Trade',
          numberOfEmployees: 87,
          rating: 6,
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
      <div>
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
