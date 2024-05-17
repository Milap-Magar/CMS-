const validate = (values) => {
    const errors = {};
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const passwordPattern = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])[a-zA-Z0-9]{8,}$/;
  
    if (!values.email) {
        errors.email = 'Email must not be empty';
    } else if (!emailPattern.test(values.email)) {
        errors.email = 'Invalid email format';
    }
  
    if (!values.password) {
        errors.password = 'Password must not be empty';
    } else if (!passwordPattern.test(values.password)) {
        errors.password = 'Password must contain at least 8 characters, including one uppercase letter, one lowercase letter, and one digit';
    } else if (values.password.length < 8) {
        errors.password = 'Password must be at least 8 characters long';
    } else if (!/[A-Z]/.test(values.password)) {
        errors.password = 'Password must contain at least one uppercase letter';
    } else if (!/[a-z]/.test(values.password)) {
        errors.password = 'Password must contain at least one lowercase letter';
    } else if (!/\d/.test(values.password)) {
        errors.password = 'Password must contain at least one digit';
    }
  
    return errors;
};
  
export default validate;
