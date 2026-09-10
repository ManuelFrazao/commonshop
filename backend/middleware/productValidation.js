const productValidation = (req, res, next) => {
    const {
        name,
        stock,
        price,
        description,
        isActive
    } = req.body;

    if (!name || typeof name !== 'string' || name.trim() === '') {
        return res.status(400).json({
            error: 'Name is required and must be a non-empty string.'
        });
    }

    if (price === undefined || typeof price !== 'number' || price <= 0) {
        return res.status(400).json({
            error: 'Price must be a positive number.'
        });
    }

    if (
        stock !== undefined &&
        (!Number.isInteger(stock) || stock < 0)
    ) {
        return res.status(400).json({
            error: 'Stock must be a non-negative integer.'
        });
    }

    if (
        description !== undefined &&
        typeof description !== 'string'
    ) {
        return res.status(400).json({
            error: 'Description must be a string.'
        });
    }

    if (
        isActive !== undefined &&
        typeof isActive !== 'boolean'
    ) {
        return res.status(400).json({
            error: 'isActive must be a boolean.'
        });
    }

    next();
};

module.exports = {
    productValidation
};