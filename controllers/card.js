module.exports.createCard = (req, res) => {
  res.send(req.user._id);
};
