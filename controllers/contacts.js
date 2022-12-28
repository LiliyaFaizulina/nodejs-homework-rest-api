const { Contact } = require("../models/contacts.js");

const { HttpError, cntrlWrapper } = require("../helpers");

const getAll = async (req, res) => {
  const { _id: owner } = req.user;
  const { page = 1, limit = 10, favorite } = req.query;
  const skip = (page - 1) * limit;
  const list = await Contact.find(
    favorite ? { owner, favorite } : { owner },
    "-createdAt -updatedAt",
    {
      skip,
      limit,
    }
  ).populate("owner", "email");
  if (!list) {
    throw HttpError(404);
  }
  res.json(list);
};

const getById = async (req, res) => {
  const _id = req.params.contactId;
  const owner = req.user._id;
  const contact = await Contact.findOne({ _id, owner });
  if (!contact) {
    throw HttpError(404);
  }
  res.json(contact);
};

const addNewContact = async (req, res) => {
  const data = req.body;
  const owner = req.user._id;
  const newContact = await Contact.create({ ...data, owner });
  res.status(201).json(newContact);
};

const deleteContact = async (req, res) => {
  const _id = req.params.contactId;
  const owner = req.user._id;
  const deletedContact = await Contact.findOneAndRemove({ _id, owner });
  if (!deletedContact) {
    throw HttpError(404);
  }
  res.json(deletedContact);
};

const updateContactById = async (req, res) => {
  const _id = req.params.contactId;
  const owner = req.user._id;
  const data = req.body;
  const contact = await Contact.findOneAndUpdate({ _id, owner }, data, {
    new: true,
  });
  if (!contact) {
    throw HttpError(404);
  }
  res.json(contact);
};

const updateFavoriteStatus = async (req, res) => {
  const _id = req.params.contactId;
  const owner = req.user._id;
  const data = req.body;
  const contact = await Contact.findOneAndUpdate({ _id, owner }, data, {
    new: true,
  });
  if (!contact) {
    throw HttpError(404);
  }
  res.json(contact);
};

module.exports = {
  getAll: cntrlWrapper(getAll),
  getById: cntrlWrapper(getById),
  addNewContact: cntrlWrapper(addNewContact),
  deleteContact: cntrlWrapper(deleteContact),
  updateContactById: cntrlWrapper(updateContactById),
  updateFavoriteStatus: cntrlWrapper(updateFavoriteStatus),
};
