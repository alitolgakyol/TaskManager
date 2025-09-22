const errorHandlerMiddleware = (err, req, res, next) => {
    console.log(err);
    res.status(err.status || 500).json({ msg: err.message });
};

module.exports = errorHandlerMiddleware;
