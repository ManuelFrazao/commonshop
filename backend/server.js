require('dotenv').config();
const { sequelize } = require('./models/index');

const express = require('express');
const cors = require('cors');

const PORT = process.env.PORT || 3000;

const routes = require('./routes/index');

const app = express();

app.use(cors());
app.use(express.json());

app.get('/', (req, res) => {
    res.json({
        message: 'Backend is running!'
    });
});

app.use('/api', routes);

(async () => {
    try {
        await sequelize.authenticate();
        console.log('Connection has been established successfully.');
    } catch (error) {
        console.error('Unable to connect to the database:', error);
    }
})();

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
})


