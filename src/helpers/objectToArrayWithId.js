const ObjectToArray = (firebaseObj) => {
  const array = [];

  for (const key in firebaseObj) {
    array.push({...firebaseObj[key], id: key});
  };

  return array;
};

export default ObjectToArray;