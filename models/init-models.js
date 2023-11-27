var DataTypes = require("sequelize").DataTypes;
var _Comment = require("./Comment");
var _Event = require("./Event");
var _Mark = require("./Mark");
var _Participant = require("./Participant");
var _Project = require("./Project");
var _ProjectType = require("./ProjectType");
var _Role = require("./Role");
var _Rubric = require("./Rubric");
var _Schedule = require("./Schedule");
var _User = require("./User");
var _Vote = require("./Vote");

function initModels(sequelize) {
  var Comment = _Comment(sequelize, DataTypes);
  var Event = _Event(sequelize, DataTypes);
  var Mark = _Mark(sequelize, DataTypes);
  var Participant = _Participant(sequelize, DataTypes);
  var Project = _Project(sequelize, DataTypes);
  var ProjectType = _ProjectType(sequelize, DataTypes);
  var Role = _Role(sequelize, DataTypes);
  var Rubric = _Rubric(sequelize, DataTypes);
  var Schedule = _Schedule(sequelize, DataTypes);
  var User = _User(sequelize, DataTypes);
  var Vote = _Vote(sequelize, DataTypes);

  Schedule.belongsTo(Event, { as: "event", foreignKey: "event_id"});
  Event.hasMany(Schedule, { as: "schedules", foreignKey: "event_id"});
  Schedule.belongsTo(Project, { as: "project", foreignKey: "project_id"});
  Project.hasMany(Schedule, { as: "schedules", foreignKey: "project_id"});

  return {
    Comment,
    Event,
    Mark,
    Participant,
    Project,
    ProjectType,
    Role,
    Rubric,
    Schedule,
    User,
    Vote,
  };
}
module.exports = initModels;
module.exports.initModels = initModels;
module.exports.default = initModels;
