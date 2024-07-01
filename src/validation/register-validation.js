const reg_validation = (values) => {
  const errors = {};

  if (!values.name || values.name.trim() === "") {
    errors.name = "Name is required";
  } else if (!/^[a-zA-Z\s]+$/.test(values.name)) {
    errors.name = "Name must contain only letters and spaces";
  } else if (values.name.length < 2) {
    errors.name = "Name must be at least 2 characters long";
  } else if (values.name.length > 50) {
    errors.name = "Name must be less than 50 characters";
  }
  if (!values.email) {
    errors.email = "Email is required";
  } else if (!/\S+@\S+\.\S+/.test(values.email)) {
    errors.email = "Email address is invalid";
  }
  if (!values.password) {
    errors.password = "password is required";
  } else if (
    !/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])[a-zA-Z0-9]{8,}$/.test(values.password)
  ) {
    errors.password = "password must contain Capital and Number";
  }
  if (!values.phone) {
    errors.phone = "Phone number is required";
  } else if (!/^\d{10}$/.test(values.phone)) {
    errors.phone = "Phone number must be 10 digits";
  }

  if (!values.address) {
    errors.address = "Address is required";
  }
  if (!values.symbol) {
    errors.symbol = "Symbol number is required";
  }
  if (!values.semester) {
    errors.semester = "Semester is required";
  }
  if (!values.program) {
    errors.program = "Program is required";
  }

  return errors;
};

export default reg_validation;
