var schemaValidateMiddleware = function (schema) {
    return (schemaValidateMiddleware[schema] = function (req, res, next) {
        var error = schema.validate(req.body, { abortEarly: false }).error;
        if (error)
            return res.status(422).send(error.details.map(function (_a) {
                var message = _a.message;
                return message;
            }));
        next();
    });
};
export default schemaValidateMiddleware;
