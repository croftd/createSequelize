var DataTypes = require("sequelize").DataTypes;
var _Attendee = require("./Attendee");
var _AttendeeVote = require("./AttendeeVote");
var _Criterion = require("./Criterion");
var _Event = require("./Event");
var _EventProject = require("./EventProject");
var _Participant = require("./Participant");
var _Project = require("./Project");
var _ProjectHasProjectType = require("./ProjectHasProjectType");
var _ProjectType = require("./ProjectType");
var _Role = require("./Role");
var _Rubric = require("./Rubric");
var _RubricCriterium = require("./RubricCriterium");
var _User = require("./User");
var _UserProject = require("./UserProject");
var _UserRole = require("./UserRole");

function initModels(sequelize) {
  var Attendee = _Attendee(sequelize, DataTypes);
  var AttendeeVote = _AttendeeVote(sequelize, DataTypes);
  var Criterion = _Criterion(sequelize, DataTypes);
  var Event = _Event(sequelize, DataTypes);
  var EventProject = _EventProject(sequelize, DataTypes);
  var Participant = _Participant(sequelize, DataTypes);
  var Project = _Project(sequelize, DataTypes);
  var ProjectHasProjectType = _ProjectHasProjectType(sequelize, DataTypes);
  var ProjectType = _ProjectType(sequelize, DataTypes);
  var Role = _Role(sequelize, DataTypes);
  var Rubric = _Rubric(sequelize, DataTypes);
  var RubricCriterium = _RubricCriterium(sequelize, DataTypes);
  var User = _User(sequelize, DataTypes);
  var UserProject = _UserProject(sequelize, DataTypes);
  var UserRole = _UserRole(sequelize, DataTypes);

  Attendee.belongsToMany(Project, { as: 'project_id_projects', through: AttendeeVote, foreignKey: "attendee_id", otherKey: "project_id" });
  Criterion.belongsToMany(Rubric, { as: 'rubric_id_rubrics', through: RubricCriterium, foreignKey: "criteria_id", otherKey: "rubric_id" });
  Event.belongsToMany(Project, { as: 'project_id_project_event_projects', through: EventProject, foreignKey: "event_id", otherKey: "project_id" });
  Project.belongsToMany(Attendee, { as: 'attendee_id_attendees', through: AttendeeVote, foreignKey: "project_id", otherKey: "attendee_id" });
  Project.belongsToMany(Event, { as: 'event_id_events', through: EventProject, foreignKey: "project_id", otherKey: "event_id" });
  Project.belongsToMany(ProjectType, { as: 'project_type_id_project_types', through: ProjectHasProjectType, foreignKey: "project_id", otherKey: "project_type_id" });
  Project.belongsToMany(User, { as: 'adjudimentor_id_users', through: Rubric, foreignKey: "project_id", otherKey: "adjudimentor_id" });
  Project.belongsToMany(User, { as: 'user_iduser_users', through: UserProject, foreignKey: "project_id_project", otherKey: "user_iduser" });
  ProjectType.belongsToMany(Project, { as: 'project_id_project_project_has_project_types', through: ProjectHasProjectType, foreignKey: "project_type_id", otherKey: "project_id" });
  Role.belongsToMany(User, { as: 'user_id_users', through: UserRole, foreignKey: "role_id", otherKey: "user_id" });
  Rubric.belongsToMany(Criterion, { as: 'criteria_id_criteria', through: RubricCriterium, foreignKey: "rubric_id", otherKey: "criteria_id" });
  User.belongsToMany(Project, { as: 'project_id_project_rubrics', through: Rubric, foreignKey: "adjudimentor_id", otherKey: "project_id" });
  User.belongsToMany(Project, { as: 'project_id_project_projects', through: UserProject, foreignKey: "user_iduser", otherKey: "project_id_project" });
  User.belongsToMany(Role, { as: 'role_id_roles', through: UserRole, foreignKey: "user_id", otherKey: "role_id" });
  AttendeeVote.belongsTo(Attendee, { as: "attendee", foreignKey: "attendee_id"});
  Attendee.hasMany(AttendeeVote, { as: "attendee_votes", foreignKey: "attendee_id"});
  RubricCriterium.belongsTo(Criterion, { as: "criterion", foreignKey: "criteria_id"});
  Criterion.hasMany(RubricCriterium, { as: "rubric_criteria", foreignKey: "criteria_id"});
  EventProject.belongsTo(Event, { as: "event", foreignKey: "event_id"});
  Event.hasMany(EventProject, { as: "event_projects", foreignKey: "event_id"});
  AttendeeVote.belongsTo(Project, { as: "project", foreignKey: "project_id"});
  Project.hasMany(AttendeeVote, { as: "attendee_votes", foreignKey: "project_id"});
  EventProject.belongsTo(Project, { as: "project", foreignKey: "project_id"});
  Project.hasMany(EventProject, { as: "event_projects", foreignKey: "project_id"});
  ProjectHasProjectType.belongsTo(Project, { as: "project", foreignKey: "project_id"});
  Project.hasMany(ProjectHasProjectType, { as: "project_has_project_types", foreignKey: "project_id"});
  Rubric.belongsTo(Project, { as: "project", foreignKey: "project_id"});
  Project.hasMany(Rubric, { as: "rubrics", foreignKey: "project_id"});
  UserProject.belongsTo(Project, { as: "project_id_project_project", foreignKey: "project_id_project"});
  Project.hasMany(UserProject, { as: "user_projects", foreignKey: "project_id_project"});
  ProjectHasProjectType.belongsTo(ProjectType, { as: "project_type", foreignKey: "project_type_id"});
  ProjectType.hasMany(ProjectHasProjectType, { as: "project_has_project_types", foreignKey: "project_type_id"});
  UserRole.belongsTo(Role, { as: "role", foreignKey: "role_id"});
  Role.hasMany(UserRole, { as: "user_roles", foreignKey: "role_id"});
  RubricCriterium.belongsTo(Rubric, { as: "rubric", foreignKey: "rubric_id"});
  Rubric.hasMany(RubricCriterium, { as: "rubric_criteria", foreignKey: "rubric_id"});
  Participant.belongsTo(User, { as: "user", foreignKey: "user_id"});
  User.hasMany(Participant, { as: "participants", foreignKey: "user_id"});
  Rubric.belongsTo(User, { as: "adjudimentor", foreignKey: "adjudimentor_id"});
  User.hasMany(Rubric, { as: "rubrics", foreignKey: "adjudimentor_id"});
  UserProject.belongsTo(User, { as: "user_iduser_user", foreignKey: "user_iduser"});
  User.hasMany(UserProject, { as: "user_projects", foreignKey: "user_iduser"});
  UserRole.belongsTo(User, { as: "user", foreignKey: "user_id"});
  User.hasMany(UserRole, { as: "user_roles", foreignKey: "user_id"});

  return {
    Attendee,
    AttendeeVote,
    Criterion,
    Event,
    EventProject,
    Participant,
    Project,
    ProjectHasProjectType,
    ProjectType,
    Role,
    Rubric,
    RubricCriterium,
    User,
    UserProject,
    UserRole,
  };
}
module.exports = initModels;
module.exports.initModels = initModels;
module.exports.default = initModels;
