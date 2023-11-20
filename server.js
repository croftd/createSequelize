// croftd - starter project for Sequelize ORM

const { Sequelize, DataTypes } = require("sequelize");

// croftd - from Sequelize documentation - use option 3 for all 
// parameters to configure database connection
// Option 3: Passing parameters separately (other dialects)
const sequelize = new Sequelize('create_app', 'croftd', 'test1234', {
  host: 'localhost',
  dialect: 'mysql'
});

// load our models
var initModels = require("./models/init-models.js");
var models = initModels(sequelize);

// croftd - authenticate with the database
try {
    sequelize.authenticate();
    console.log('Connection has been established successfully.');
    sequelize.query('show tables').then(function(rows) {
        console.log(JSON.stringify(rows));
    });



} catch (error) {
    console.error('Unable to connect to the database:', error);
}


// croftd - this can't run if authentication or object creation asynchronous
//sequelize.close();
