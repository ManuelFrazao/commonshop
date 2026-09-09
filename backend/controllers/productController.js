const { Product, Category } = require('../models');

const CreateProduct = async (req, res) => {
    const { categoryId } = req.params.categoryId || req.body.categoryId;
    const { prodId, name, stock, price, description, isActive } = req.body;

    try {
        const product = await Product.create({
            categoryId,
            name,
            stock,
            price,
            description,
            isActive,
        });

        const prodCategory = await Product.findByPk(product.prodId, {
            include: [{ model: Category, as: 'categories', atributes: ['categoryId', 'name'] }],
        });

        res.status(201).json('Product created:', prodCategory);
    } catch (err) {
        console.error.json({ error: err.message });
        res.status(500).send('Internal server error.')
    }
}

module.exports = { CreateProduct };