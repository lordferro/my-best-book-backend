const { HttpError } = require("../helpers");

const validateBody = (schema) => {
  const func = (req, res, next) => {
    const { error } = schema.validate(req.body);
    if (error) {
      next(HttpError(400, error.message));
    }
    if (req.body.name.toLowerCase().includes(" and "))
      next(HttpError(404, "Sorry, but you cant use stand alone word 'and'"));

    next();
  };
  return func;
};

module.exports = validateBody;
