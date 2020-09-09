const validate = values => {
  const errors = {};
  const requiredFields = ['username', 'password'];
  requiredFields.forEach(field => {
    if (!values[field]) {
      errors[field] = 'Required';
    }
  });
  return errors;
};

export default validate;
