const { isValidId } = require("../utils/validation");

const validateId = (req, res, next) => {
  if (!isValidId(req.params.id)) {
    return res.status(400).json({
      success: false,
      message: "Invalid ID.",
    });
  }

  next();
};

module.exports = validateId;
