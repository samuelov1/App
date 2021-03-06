const validate = (schema) => (req, res, next) => {
  const { error, value } = schema.validate(req, { abortEarly: false });
  if (error) {
    const parsedError = error.details
      .map((x) => x.message)
      .join(", ")
      .replace(/"/g, "'");
    res.status(422).send({ status: "error", message: parsedError });
  } else {
    req.body = value.body;
    req.params = value.params;
    next();
  }
};

export default validate;
