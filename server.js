// croftd - starter project for Sequelize ORM
// Updated Nov. 26, 2023
// query examples adapted from:
// https://www.digitalocean.com/community/tutorials/how-to-use-sequelize-with-node-js-and-mysql

// this is the ORM package
const { Sequelize, DataTypes } = require("sequelize");

// croftd - from Sequelize documentation - use option 3 for all 
// parameters to configure database connection
// TODO: I would recommend create a local user rather than using
// root with no password!
// Option 3: Passing parameters separately (other dialects)
const sequelize = new Sequelize('create_app', 'create_app', 'create123$', {
  host: 'localhost',
  dialect: 'mysql'
});

// load our models that were auto-generated
var initModels = require("./models/init-models.js");
var models = initModels(sequelize);

// UserProject
models.User.belongsToMany(models.Project, { through: 'user_project' });
models.Project.belongsToMany(models.User, { through: 'user_project' });
// EventProject
models.Event.belongsToMany(models.Project, { through: 'event_project' });
models.Project.belongsToMany(models.Event, { through: 'event_project' });
// UserRole
models.User.belongsToMany(models.Role, { through: 'user_role' });
models.Role.belongsToMany(models.User, { through: 'user_role' });


// Syncing the models with the database
sequelize.sync().then(() => {
  console.log('Tables and models synced successfully!');
}).catch((error) => {
  console.error('Unable to sync:', error);
});

// croftd - funtion that contains examples adding/getting Entity Models
//
async function dbExamples() {
  console.log('Running tests for CREATEapp db entities...');

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

    // create a new user
    console.log('Creating new users!');
    const user1 = await models.User.create({
      first_name: "Bob",
      last_name: "Ross",
      email_address: "bobby@ross.com",
      is_participant: 1
    });

    // create a second user
    const user2 = await models.User.create({
      first_name: "Jane",
      last_name: "Doe",
      email_address: "jane@doe.com",
      is_participant: 0
    });

    // create a Project
    console.log("Creating a project: ");
    const project1 = await models.Project.create({
      theme: "Research effect of global warming on Lake Cameron water temperature",
      course_name: "GEOG222",
      title: "Cameron Lake water warming",
      description: "Study between 2021 and 2023 on Cameron Lake water temperature"
    });
    console.log("Here is project1: " + project1);

    // create a Project
    console.log("Creating a second project: ");
    const project2 = await models.Project.create({
      theme: "Bobby's AI App",
      course_name: "ITAS264",
      title: "App to read minds",
      description: "Mind reading app"
    });
    console.log("Here is project2: " + project2);

    // Example to get a list of all Users
    console.log("Here are the current users:");
    await models.User.findAll().then(res => {
      //console.log(res)
      res.forEach(function (el) {
        console.log("User: " + el.dataValues.id + " first_name: " + el.dataValues.first_name);
      });
    }).catch((error) => {
      console.error('Failed to retrieve data : ', error);
    });

    // Find a single User with a specific id and use .then to log the response
    await models.User.findOne({
      where: {
        id: "1"
      }
    }).then(res => {
      console.log("Here is the user with id=1: " + res);
      // This should be a Sequelize User object - to test print the first_name
      console.log("The firstname of this user is: " + res.first_name);
    }).catch((error) => {
      console.error('Failed to retrieve data : ', error);
    });

    // adapted from sequelize documentation at:
    // https://sequelize.org/docs/v6/advanced-association-concepts/advanced-many-to-many/
    // https://sequelize.org/api/v6/class/src/associations/belongs-to-many.js~belongstomany
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

    // croftd - example to create many-many associations
    // create an association between user1 and project1
    console.log("Here is user1: " + user1);
    console.log("Here is project1: " + project1);

    // create associations between user1 and the 2 projects
    await user1.addProject(project1);
    await user1.addProject(project2);
    
    // note for associative entities that have additional columns we can pass these 
    // through such as (here there would be a column 'role'):
    // user.addProject(project, { through: { role: 'manager' }});
    // https://sequelize.org/api/v6/class/src/associations/belongs-to-many.js~belongstomany
    // https://sequelize.org/docs/v6/core-concepts/model-querying-finders/
    
    // sequelize syntax to join in Project data for this user
    const projects = await user1.getProjects();
    console.log("Here are the projects for user1: " + projects);
    projects.forEach(function (proj) {
      console.log("\tProject: " + proj.title);
    });

  } catch (error) {
    console.error('Unable to connect to the database:', error);
  }

  // croftd - this can't run if authentication or object creation asynchronous
  //sequelize.close();
}

// Here we wait for the dbExamples to finish
// and then returns a promise that'll be waited for aswell
// It's useless to wait the dbExamples to finish before to return
// we can simply returns a promise that will be resolved later

// Also point that we don't use async keyword on the function because
// we can simply returns the promise returned by dbExamples()
function start() {
  return dbExamples();
}

// Call start
(async () => {
  console.log('Starting server.js');

  await start();

  console.log('End of server.js');
})();

