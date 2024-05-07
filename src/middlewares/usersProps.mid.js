function usersProps(req, res, next) {
  const data = req.body;
  const errors = [];

  const requiredProps = [
    "id",
    "photo",
    "email",
    "password",
  ];
  requiredProps.forEach((prop) => {
    if (!data[prop]) {
      errors.push(`"${prop}" is a required field.`);
    }
  });

  //? validate e-mail 
  if (data.email && !/\S+@\S+\.\S+/.test(data.email)) {
    errors.push(`"email" must be a valid email address.`);
  }

  // Validate password with at least 8 characters, a capital letter and a number.
  if (data.password && !/(?=.*[A-Z])(?=.*[0-9]).{8,}/.test(data.password)) {
    errors.push(
      `"password" must be at least 8 characters long and contain at least one uppercase letter and one number.`
    );
  }

  // Validate by default that role is 0 (0 = user / 1= admin)
  if (!data.role) {
    req.body.role = 0;
  }

  // If there are errors, return an error message.
  if (errors.length > 0) {
    return res.status(400).json({
      statusCode: 400,
      response: null,
      message: `Validation error: ${errors.join(", ")}`,
    });
  }
  next();
}

export default usersProps;