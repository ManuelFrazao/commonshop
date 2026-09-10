const { Category } = require('../models');

const CreateCategory = async (req, res) => {
    const { name } = req.body;

    try {

        const category = await Category.create({
            name,
        });

        res.status(201).json({ message: 'Category created:', category });
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Internal server error.' });
    }
};

const FindCategories = async ({ }, page = 1, limit = 10) => {
    const offset = (page - 1) * limit;

    return await Category.findAndCountAll({
        order: [['categoryId', 'ASC']],
        limit,
        offset,
    })
}

const GetCategories = async (req, res) => {
    try {
        const { page, limit } = req.pagination;

        const result = await FindCategories({}, page, limit);

        const totalCategories = result.count;
        const categories = result.rows;
        const totalPages = Math.ceil(totalCategories / limit);

        if (categories.length === 0) {
            return res.status(200).json({ message: 'No categories yet.', categories: [] });
        };

        res.status(200).json({ message: 'List of categories:', page, limit, totalCategories, totalPages, categories });
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Internal server error.' });
    };
}

module.exports = {
    CreateCategory,
    GetCategories
};