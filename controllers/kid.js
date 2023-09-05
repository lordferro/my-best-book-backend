const { ctrlWrapper, HttpError } = require("../helpers");
const { Kid } = require("../models/kid");

const register = async (req, res) => {
  let newKid = await Kid.create({
    ...req.body,
  });

  res.status(201).json(newKid);
};

const getKid = async (req, res) => {
  const { id } = req.params;

  const kid = await Kid.findById(id);
  res.json(kid);
};

module.exports = {
  register: ctrlWrapper(register),
  getCurrent: ctrlWrapper(getKid),
};
