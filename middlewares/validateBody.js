const { HttpError } = require("../helpers");

const validateBody = (schema) => {
  const func = (req, res, next) => {
    const { error } = schema.validate(req.body);
    if (error) {
      next(HttpError(400, error.message));
    }
    if (req.body.name.toLowerCase().includes(" and "))
      next(HttpError(404, "Sorry, but you cant use stand alone word 'and'"));
    const handlerArray = req.body.name.split(" ");

    const resultArray = [];

    for (const item of handlerArray) {
      if (item) resultArray.push(item.charAt(0).toUpperCase() + item.slice(1));
    }
    req.body.name = resultArray.join(" ");
    next();
  };
  return func;
};

module.exports = validateBody;
