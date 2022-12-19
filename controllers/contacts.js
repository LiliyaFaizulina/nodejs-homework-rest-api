const { Contact } = require("../models/contacts.js");

const { HttpError } = require("../helpers");

const { cntrlWrapper } = require("../helpers");

const getAll = async (req, res) => {
  const list = await Contact.find();
  if (!list) {
    throw HttpError(404);
  }
  res.json(list);
};

const getById = async (req, res) => {
  const { contactId } = req.params;
  const contact = await Contact.findById(contactId);
  if (!contact) {
    throw HttpError(404);
  }
  res.json(contact);
};

const addNewContact = async (req, res) => {
  const data = req.body;
  const newContact = await Contact.create(data);
  res.status(201).json(newContact);
};

const deleteContact = async (req, res) => {
  const { contactId } = req.params;
  const message = await Contact.findByIdAndDelete(contactId);
  if (!message) {
    throw HttpError(404);
  }
  res.json({ message });
};

const updateContactById = async (req, res) => {
  const { contactId } = req.params;
  const data = req.body;
  const contact = await Contact.findByIdAndUpdate(contactId, data, {
    new: true,
  });
  if (!contact) {
    throw HttpError(404);
  }
  res.json(contact);
};

const updateFavoriteStatus = async (req, res) => {
  const { contactId } = req.params;
  const data = req.body;
  const contact = await Contact.findByIdAndUpdate(contactId, data, {
    new: true,
  });
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
