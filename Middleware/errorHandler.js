module.exports = (err, req, res, next) => {
  console.error(err.stack);
  res.json({
    success: false,
    message: err.message || 'Something went wrong'
  });
};
