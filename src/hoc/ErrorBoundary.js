import { Component } from 'react';

class ErrorBoundary extends Component {
  state = {
    hasError: false,
  };

  static getDerivedStateFromError(error) {
    return { hasError: true, error };
  };
  
  componentDidCatch(error, errorInfo) {
     
  };

  render() {
    return this.state.hasError
      ? <div className='alert alert-danger m-5 p-5 text-center'>
          <h3>Problems with a website: {this.state.error.toString()}</h3>
          <h5>Please try later!</h5>
        </div>
      : this.props.children 
  };
};

export default ErrorBoundary;