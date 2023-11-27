var DataTypes = require("sequelize").DataTypes;
var _Attendee = require("./Attendee");
var _Comment = require("./Comment");
var _CommentType = require("./CommentType");
var _Event = require("./Event");
var _Mark = require("./Mark");
var _Participant = require("./Participant");
var _Project = require("./Project");
var _ProjectType = require("./ProjectType");
var _Role = require("./Role");
var _Rubric = require("./Rubric");
var _RubricCriterium = require("./RubricCriterium");
var _RubricNomination = require("./RubricNomination");
var _User = require("./User");
var _Schedule = require("./Schedule");


function initModels(sequelize) {
  var Attendee = _Attendee(sequelize, DataTypes);
  var Comment = _Comment(sequelize, DataTypes);
  var CommentType = _CommentType(sequelize, DataTypes);
  var Event = _Event(sequelize, DataTypes);
  var Mark = _Mark(sequelize, DataTypes);
  var Participant = _Participant(sequelize, DataTypes);
  var Project = _Project(sequelize, DataTypes);
  var ProjectType = _ProjectType(sequelize, DataTypes);
  var Role = _Role(sequelize, DataTypes);
  var Rubric = _Rubric(sequelize, DataTypes);
  var RubricCriterium = _RubricCriterium(sequelize, DataTypes);
  var RubricNomination = _RubricNomination(sequelize, DataTypes);
  var User = _User(sequelize, DataTypes);
  var Schedule = _Schedule(sequelize, DataTypes);


  return {
    Attendee,
    Comment,
    CommentType,
    Event,
    Mark,
    Participant,
    Project,
    ProjectType,
    Role,
    Rubric,
    RubricCriterium,
    RubricNomination,
    User,
    Schedule,
  };
}
module.exports = initModels;
module.exports.initModels = initModels;
module.exports.default = initModels;
