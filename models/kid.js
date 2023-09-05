const { Schema, model } = require("mongoose");
const Joi = require("joi");
const { handleMongooseError } = require("../helpers");

const sexEnum = {
  MALE: "male",
  FEMALE: "female",
};

const regEx = /^[a-zA-Z][a-zA-Z -]*[a-zA-Z]$/;


const kidSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
      match: [regEx, "characters like `()[]&/,.` or numbers - not allowed"],
    },
    sex: {
      type: String,
      enum: sexEnum,
    },
  },
  { versionKey: false, timestamps: true }
);

kidSchema.post("save", handleMongooseError);

const kidSchemaJoi = Joi.object({
  name: Joi.string()
    .min(2)
    .max(50)
    .required()
    .regex(regEx, "characters like `()[]&/,.` or numbers - not allowed")
    .messages({
      "string.pattern.base":
        "name is at least two characters, and contains no special characters like `()[]&/,.`, and no numbers, and not the stand alone word ' and '",
    }),
  sex: Joi.string()
    .valid(...Object.values(sexEnum))
    .messages({
      "string.pattern.base": "please choose either male either female",
    }),
});

const schemas = {
  kidSchemaJoi,
};

const Kid = model("kid", kidSchema);

module.exports = {
  Kid,
  schemas,
};
