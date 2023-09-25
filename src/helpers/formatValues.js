export const formatValues = (value) => {
    if (Array.isArray(value)) {
      let array = [];

      for(let i = 0; i < value.length; i++) {
        switch (value[i]) {
          case 'multisportCard':
            array.push('Multisport card');
            break;
          case 'playroom':
            array.push('Playroom');
            break;
          case 'medicalPackage':
            array.push('Medical package');
            break;
          case 'fruitThursdays':
            array.push('Fruit Thursdays');
            break;
          default:
            array.push('-------')
        };
      };    

      return (array.length === 0) ? '-------' : array.join(', ')

    } else {
      const capitalLetter = value.slice(0,1).toUpperCase();
      const restText = value.slice(1);

      return capitalLetter + restText;
    };
  };