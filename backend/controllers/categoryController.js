const { Category } = require('../models');

const CreateCategory = async (req, res) => {
    const { categoryId, name } = req.body;

    try {
        const category = await Category.create({
            name,
        });

        res.status(201).json('Category created:', category);
    } catch (err) {
        console.error.json({ error: err.message });
        res.status(500).send('Internal server error.')
    }
};

module.exports = { CreateCategory };