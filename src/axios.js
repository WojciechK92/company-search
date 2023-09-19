import axios from 'axios';

const instance = axios.create({
  baseURL: 'https://company-search-58307-default-rtdb.europe-west1.firebasedatabase.app',
});

export default instance;