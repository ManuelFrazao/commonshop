const paginationValidation = (req, res, next) => {
    const page = req.query.page === undefined
        ? 1
        : Number(req.query.page);

    const limit = req.query.limit === undefined
        ? 10
        : Number(req.query.limit);

    if (!Number.isInteger(page) || page < 1) {
        return res.status(400).json({
            error: 'Page must be a positive integer.'
        });
    }

    if (!Number.isInteger(limit) || limit < 1 || limit > 100) {
        return res.status(400).json({
            error: 'Limit must be an integer between 1 and 100.'
        });
    }

    req.pagination = {
        page,
        limit
    };

    next();
};

module.exports = {
    paginationValidation
};