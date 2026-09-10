const { Product, Category } = require('../models');

const CreateProduct = async (req, res) => {
    const { name, stock, price, description, isActive } = req.body;

    try {

        const category = await Category.findByPk(categoryId);

        if (!category) {
            return res.status(400).json({ error: 'Category does not exist.' });
        };

        const product = await Product.create({
            categoryId,
            name,
            stock,
            price,
            description,
            isActive,
        });

        const prodCategory = await Product.findByPk(product.prodId, {
            include: [
                {
                    model: Category,
                    as: 'category',
                    attributes: ['categoryId', 'name']
                }
            ],
        });

        res.status(201).json({ message: 'Product created:', product: prodCategory });

    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Internal server error.' });
    };
};

const FindProducts = async (where = {}, page = 1, limit = 10) => {
    const offset = (page - 1) * limit;

    return await Product.findAndCountAll({
        where,
        order: [['prodId', 'ASC']],
        limit,
        offset,
        include: [
            {
                model: Category,
                as: 'category',
                attributes: ['categoryId', 'name']
            }
        ]
    });
}

const GetProducts = async (req, res) => {
    try {
        const { page, limit } = req.pagination;

        const result = await FindProducts({}, page, limit);

        const totalProducts = result.count;
        const products = result.rows;
        const totalPages = Math.ceil(totalProducts / limit);

        if (products.length === 0) {
            return res.status(200).json({ message: 'No products yet.', products: [] });
        }

        res.status(200).json({ message: 'List of products:', page, limit, totalProducts, totalPages, products });
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Internal server error.' });
    };
};

const GetActiveProducts = async (req, res) => {
    try {
        const { page, limit } = req.pagination;

        const result = await FindProducts(
            { isActive: true },
            page,
            limit
        );

        const totalProducts = result.count;
        const products = result.rows;
        const totalPages = Math.ceil(totalProducts / limit);


        if (products.length === 0) {
            return res.status(200).json({ message: 'No products yet.', products: [] })
        }

        res.status(200).json({ message: 'List of active products:', page, limit, totalProducts, totalPages, products });
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Internal server error.' })
    }
}

module.exports = {
    CreateProduct,
    GetProducts,
    GetActiveProducts
};