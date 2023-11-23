// croftd - starter project for Sequelize ORM
// Updated Nov. 23, 2023
// query examples adapted from:
// https://www.digitalocean.com/community/tutorials/how-to-use-sequelize-with-node-js-and-mysql

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

// croftd - authenticate with the database - note all our queries
// are contained within this try block as we can't execute any of 
// them if we are not authenticated with the database!
try {
  sequelize.authenticate();
  console.log('Connection has been established successfully.');

  // croftd - we can run queries manually - example of show tables
  console.log("Here are the tables in the current database: ");
  sequelize.query('show tables').then(function (rows) {
    console.log(JSON.stringify(rows));
  });

  // sync with the database - we only need to do this if our code
  // is programmatically create new tables - in this case we have used
  // Sequelize-auto to automatically generate User, Project objects etc.
  // by querying the tables that already exist in the database.
  //sequelize.sync().then(() => {


  // create a new user
  console.log('Creating new users!');
  const user1 = models.User.create({
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

  // create a Project
  console.log("Creating a project: ");
  const project1 = models.Project.create({
    theme: "Research effect of global warming on Lake Cameron water temperature",
    course_name: "GEOG222",
    title: "Cameron Lake water warming",
    description: "Study between 2021 and 2023 on Cameron Lake water temperature"
  }).then(res => {
    console.log(res)
  }).catch((error) => {
    console.error('Failed to create a new record : ', error);
  });

  // Example to get a list of all Users
  console.log("Here are the current users:");
  models.User.findAll().then(res => {
    //console.log(res)
    res.forEach(function (el) {
      console.log("User: " + el.dataValues.id + " first_name: " + el.dataValues.first_name);
    });
  }).catch((error) => {
    console.error('Failed to retrieve data : ', error);
  });

  // Find a single User with a specific id
  models.User.findOne({
    where: {
      id: "1"
    }
  }).then(res => {
    console.log("Here is the user with id=1: " + res);
  }).catch((error) => {
    console.error('Failed to retrieve data : ', error);
  });

  // adapted from sequelize documentation at:
  // https://sequelize.org/docs/v6/advanced-association-concepts/advanced-many-to-many/
  // note you can add attributes to the association table using 'through' - see below:
  //
  // const amidala = await User.create({ username: 'p4dm3', points: 1000 });
  // const queen = await Profile.create({ name: 'Queen' });
  // await amidala.addProfile(queen, { through: { selfGranted: false } });
  // const result = await User.findOne({
  // where: { username: 'p4dm3' },
  // include: Profile
  // });
  // console.log(result);

  // croftd - TODO - example to create many-many associations
  // create an association between user1 and project1
  console.log("Here is user1: " + user1);
  //user1.addProject(project1);
  console.log("Here is project1: " + project1);
  
  //const mmResult = models.User.findOne({
  //  where: { username: 'Bob' },
  //  include: models.Project
  //});
  //console.log("Here is the many-to-many: " + mmResult);

} catch (error) {
  console.error('Unable to connect to the database:', error);
}


// croftd - this can't run if authentication or object creation asynchronous
//sequelize.close();
