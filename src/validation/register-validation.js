const reg_validation = (values) => {
  const errors = {};

  if (!values.name) {
    errors.name = "Name is required";
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
    errors.password = "password address is invalid";
  }
  if (!values.phone) {
    errors.phone = "Phone number is required";
  } else if (!/^\d{10}$/.test(values.phone)) {
    errors.phone = "Phone number must be 10 digits";
  }

  if (!values.address) {
    errors.address = "Address is required";
  }
  if (!values.symbolNo) {
    errors.symbolNo = "Symbol number is required";
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
