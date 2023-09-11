import { useState } from 'react';

const useStateStorage = (key, keyValue) => {
  const [state, setState] = useState(keyValue);
  let value;
  
  const storageValue = JSON.parse(window.localStorage.getItem(key));  
  if (storageValue) {
    value = storageValue;
  } else {
    value = state; 
  };

  const setValue = (newValue) => {
    window.localStorage.setItem(key, JSON.stringify(newValue));
    value = newValue;
    setState(newValue);
  };
  
  return [value, setValue]; 
};

export default useStateStorage;