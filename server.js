// croftd - starter project for Sequelize ORM
// Nov. 19, 2023

// this is the ORM package
const { Sequelize, DataTypes } = require("sequelize");

// croftd - from Sequelize documentation - use option 3 for all 
// parameters to configure database connection
// Option 3: Passing parameters separately (other dialects)
const sequelize = new Sequelize('create_app', 'croftd', 'test1234', {
  host: 'localhost',
  dialect: 'mysql'
});

// load our models that were auto-generated
var initModels = require("./models/init-models.js");
var models = initModels(sequelize);

// croftd - authenticate with the database
try {
  sequelize.authenticate();
  console.log('Connection has been established successfully.');
  sequelize.query('show tables').then(function (rows) {
    console.log(JSON.stringify(rows));
  });


  sequelize.sync().then(() => {
    console.log('Creating a new user!');

    // create a new user
    models.User.create({
      first_name: "Bob",
      last_name: "Ross",
      email_address: "bobby@ross.com",
      is_participant: 1
    }).then(res => {
      console.log(res)
    }).catch((error) => {
      console.error('Failed to create a new record : ', error);
    });

    // create a second user
    models.User.create({
      first_name: "Jane",
      last_name: "Doe",
      email_address: "jane@doe.com",
      is_participant: 0
    }).then(res => {
      console.log(res)
    }).catch((error) => {
      console.error('Failed to create a new record : ', error);
    });

    // Example to get a list of all Users
    console.log("Here are the current users:");
    models.User.findAll().then(res => {
      console.log(res)
    }).catch((error) => {
      console.error('Failed to retrieve data : ', error);
    });


  }).catch((error) => {
    console.error('Unable to create table : ', error);
  });


} catch (error) {
  console.error('Unable to connect to the database:', error);
}


// croftd - this can't run if authentication or object creation asynchronous
//sequelize.close();
