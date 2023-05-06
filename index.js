const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const dotenv = require('dotenv');
const productRoutes = require('./routes/product');
const userRoutes = require('./routes/auth');
const errorHandler = require('./middlewares/error-handlers');

dotenv.config();

const app = express();
const port = process.env.PORT || 3000;

app.use(express.json());
app.use(cors());
app.use('/api/products', productRoutes);
app.use('/api/users', userRoutes);
app.use(errorHandler);

mongoose
  .connect(process.env.MONGODB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    app.listen(port, () => {
      console.log(`Server running on port ${ port } `);
    });
  })
  .catch((error) => {
    console.error(error);
  });
