var handleErrorMiddleware = function (err, req, res, next) {
    res.status(err.status || 500).send(err.message || "Internal server error");
};
export default handleErrorMiddleware;
