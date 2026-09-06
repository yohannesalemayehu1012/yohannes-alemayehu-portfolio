const isValidId = (id) => /^\d+$/.test(String(id));

module.exports = {
  isValidId,
};
