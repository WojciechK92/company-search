const availableRules = {
  required(value) {
    return (value.length) > 0 ? '' : 'This field is required!'
  },
  email(value) {
    var re = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
    return re.test(value) ? '' : 'This is invalid email!';
  },
  password(value) {
    return value.length >= 6 ? '' : 'Password must contain at least 6 characters!'
  },
  integer(value) {
    const result = Number.isInteger(Number(value));
    return result ? '' : 'This field must contain an integer!';
  },
  positive(value) {
    return (value > 0) ? '' : 'This field must contain positive number!';
  },
};

export const validate = (value, rules = []) => {
  let errorMessage = '';

  rules.forEach(rule => {
    if (!errorMessage) errorMessage = availableRules[rule](value);
  });

  return errorMessage;
};

export const checkValid = (obj) => {
  let valid = true;
  for (const key in obj) {
    if (!obj[key].valid) valid = false;
  };

  return valid;
};

 export const changeHandler = (form, setForm, value, fieldName) => {
  const error = validate(value, form[fieldName].rules);
  const valid = error ? false : true;
  setForm({...form, [fieldName]: {...form[fieldName], value, error, valid}});
 };