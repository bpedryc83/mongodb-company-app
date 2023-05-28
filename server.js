const express = require('express');
const cors = require('cors');
const mongoClient = require('mongodb').MongoClient;

mongoClient.connect('mongodb://localhost:27017', { useNewUrlParser: true, useUnifiedTopology: true }, (err, client) => {
  if (err){
    console.log(err);
  }
  else {
    const db = client.db('companyDB');
    console.log('Successfully connected to the database');
  
    const app = express();

    app.use((req, res, next) => {
      req.db = db;
      next();
    });

    const employeesRoutes = require('./routes/employees.routes');
    const departmentsRoutes = require('./routes/departments.routes');
    const productsRoutes = require('./routes/products.routes');

    app.use(cors());
    app.use(express.json());
    app.use(express.urlencoded({ extended: false }));

    app.use('/api', employeesRoutes);
    app.use('/api', departmentsRoutes);
    app.use('/api', productsRoutes);

    app.use((req, res) => {
      res.status(404).send({ message: 'Not found...' });
    })

    app.listen('8000', () => {
      console.log('Server is running on port: 8000');
    });
  }
});

