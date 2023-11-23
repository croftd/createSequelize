var DataTypes = require("sequelize").DataTypes;
var _Attendee = require("./Attendee");
var _AttendeeVote = require("./AttendeeVote");
var _Comment = require("./Comment");
var _CommentType = require("./CommentType");
var _Event = require("./Event");
var _EventProject = require("./EventProject");
var _Mark = require("./Mark");
var _Participant = require("./Participant");
var _Project = require("./Project");
var _ProjectHasProjectType = require("./ProjectHasProjectType");
var _ProjectRubric = require("./ProjectRubric");
var _ProjectType = require("./ProjectType");
var _Role = require("./Role");
var _Rubric = require("./Rubric");
var _RubricCriterium = require("./RubricCriterium");
var _RubricNomination = require("./RubricNomination");
var _User = require("./User");
var _UserProject = require("./UserProject");
var _UserRole = require("./UserRole");

function initModels(sequelize) {
  var Attendee = _Attendee(sequelize, DataTypes);
  var AttendeeVote = _AttendeeVote(sequelize, DataTypes);
  var Comment = _Comment(sequelize, DataTypes);
  var CommentType = _CommentType(sequelize, DataTypes);
  var Event = _Event(sequelize, DataTypes);
  var EventProject = _EventProject(sequelize, DataTypes);
  var Mark = _Mark(sequelize, DataTypes);
  var Participant = _Participant(sequelize, DataTypes);
  var Project = _Project(sequelize, DataTypes);
  var ProjectHasProjectType = _ProjectHasProjectType(sequelize, DataTypes);
  var ProjectRubric = _ProjectRubric(sequelize, DataTypes);
  var ProjectType = _ProjectType(sequelize, DataTypes);
  var Role = _Role(sequelize, DataTypes);
  var Rubric = _Rubric(sequelize, DataTypes);
  var RubricCriterium = _RubricCriterium(sequelize, DataTypes);
  var RubricNomination = _RubricNomination(sequelize, DataTypes);
  var User = _User(sequelize, DataTypes);
  var UserProject = _UserProject(sequelize, DataTypes);
  var UserRole = _UserRole(sequelize, DataTypes);

  Attendee.belongsToMany(Project, { as: 'project_id_projects', through: AttendeeVote, foreignKey: "attendee_id", otherKey: "project_id" });
  CommentType.belongsToMany(Rubric, { as: 'rubric_id_rubrics', through: Comment, foreignKey: "comment_type_id", otherKey: "rubric_id" });
  Event.belongsToMany(Project, { as: 'project_id_project_event_projects', through: EventProject, foreignKey: "event_id", otherKey: "project_id" });
  Project.belongsToMany(Attendee, { as: 'attendee_id_attendees', through: AttendeeVote, foreignKey: "project_id", otherKey: "attendee_id" });
  Project.belongsToMany(Event, { as: 'event_id_events', through: EventProject, foreignKey: "project_id", otherKey: "event_id" });
  Project.belongsToMany(ProjectType, { as: 'project_type_id_project_types', through: ProjectHasProjectType, foreignKey: "project_id", otherKey: "project_type_id" });
  Project.belongsToMany(Rubric, { as: 'rubric_id_rubric_project_rubrics', through: ProjectRubric, foreignKey: "project_id", otherKey: "rubric_id" });
  Project.belongsToMany(User, { as: 'user_iduser_users', through: UserProject, foreignKey: "project_id_project", otherKey: "user_iduser" });
  ProjectType.belongsToMany(Project, { as: 'project_id_project_project_has_project_types', through: ProjectHasProjectType, foreignKey: "project_type_id", otherKey: "project_id" });
  Role.belongsToMany(User, { as: 'user_id_users', through: UserRole, foreignKey: "role_id", otherKey: "user_id" });
  Rubric.belongsToMany(CommentType, { as: 'comment_type_id_comment_types', through: Comment, foreignKey: "rubric_id", otherKey: "comment_type_id" });
  Rubric.belongsToMany(Project, { as: 'project_id_project_project_rubrics', through: ProjectRubric, foreignKey: "rubric_id", otherKey: "project_id" });
  Rubric.belongsToMany(User, { as: 'adjudimentor_user_id_users', through: RubricNomination, foreignKey: "rubric_id", otherKey: "adjudimentor_user_id" });
  User.belongsToMany(Project, { as: 'project_id_project_projects', through: UserProject, foreignKey: "user_iduser", otherKey: "project_id_project" });
  User.belongsToMany(Role, { as: 'role_id_roles', through: UserRole, foreignKey: "user_id", otherKey: "role_id" });
  User.belongsToMany(Rubric, { as: 'rubric_id_rubric_rubric_nominations', through: RubricNomination, foreignKey: "adjudimentor_user_id", otherKey: "rubric_id" });
  AttendeeVote.belongsTo(Attendee, { as: "attendee", foreignKey: "attendee_id"});
  Attendee.hasMany(AttendeeVote, { as: "attendee_votes", foreignKey: "attendee_id"});
  Comment.belongsTo(CommentType, { as: "comment_type", foreignKey: "comment_type_id"});
  CommentType.hasMany(Comment, { as: "comments", foreignKey: "comment_type_id"});
  EventProject.belongsTo(Event, { as: "event", foreignKey: "event_id"});
  Event.hasMany(EventProject, { as: "event_projects", foreignKey: "event_id"});
  AttendeeVote.belongsTo(Project, { as: "project", foreignKey: "project_id"});
  Project.hasMany(AttendeeVote, { as: "attendee_votes", foreignKey: "project_id"});
  EventProject.belongsTo(Project, { as: "project", foreignKey: "project_id"});
  Project.hasMany(EventProject, { as: "event_projects", foreignKey: "project_id"});
  ProjectHasProjectType.belongsTo(Project, { as: "project", foreignKey: "project_id"});
  Project.hasMany(ProjectHasProjectType, { as: "project_has_project_types", foreignKey: "project_id"});
  ProjectRubric.belongsTo(Project, { as: "project", foreignKey: "project_id"});
  Project.hasMany(ProjectRubric, { as: "project_rubrics", foreignKey: "project_id"});
  UserProject.belongsTo(Project, { as: "project_id_project_project", foreignKey: "project_id_project"});
  Project.hasMany(UserProject, { as: "user_projects", foreignKey: "project_id_project"});
  ProjectHasProjectType.belongsTo(ProjectType, { as: "project_type", foreignKey: "project_type_id"});
  ProjectType.hasMany(ProjectHasProjectType, { as: "project_has_project_types", foreignKey: "project_type_id"});
  Rubric.belongsTo(ProjectType, { as: "type", foreignKey: "type_id"});
  ProjectType.hasMany(Rubric, { as: "rubrics", foreignKey: "type_id"});
  UserRole.belongsTo(Role, { as: "role", foreignKey: "role_id"});
  Role.hasMany(UserRole, { as: "user_roles", foreignKey: "role_id"});
  Comment.belongsTo(Rubric, { as: "rubric", foreignKey: "rubric_id"});
  Rubric.hasMany(Comment, { as: "comments", foreignKey: "rubric_id"});
  ProjectRubric.belongsTo(Rubric, { as: "rubric", foreignKey: "rubric_id"});
  Rubric.hasMany(ProjectRubric, { as: "project_rubrics", foreignKey: "rubric_id"});
  RubricCriterium.belongsTo(Rubric, { as: "rubric", foreignKey: "rubric_id"});
  Rubric.hasMany(RubricCriterium, { as: "rubric_criteria", foreignKey: "rubric_id"});
  RubricNomination.belongsTo(Rubric, { as: "rubric", foreignKey: "rubric_id"});
  Rubric.hasMany(RubricNomination, { as: "rubric_nominations", foreignKey: "rubric_id"});
  Mark.belongsTo(RubricCriterium, { as: "criterion", foreignKey: "criteria_id"});
  RubricCriterium.hasMany(Mark, { as: "marks", foreignKey: "criteria_id"});
  Participant.belongsTo(User, { as: "user", foreignKey: "user_id"});
  User.hasMany(Participant, { as: "participants", foreignKey: "user_id"});
  RubricNomination.belongsTo(User, { as: "adjudimentor_user", foreignKey: "adjudimentor_user_id"});
  User.hasMany(RubricNomination, { as: "rubric_nominations", foreignKey: "adjudimentor_user_id"});
  UserProject.belongsTo(User, { as: "user_iduser_user", foreignKey: "user_iduser"});
  User.hasMany(UserProject, { as: "user_projects", foreignKey: "user_iduser"});
  UserRole.belongsTo(User, { as: "user", foreignKey: "user_id"});
  User.hasMany(UserRole, { as: "user_roles", foreignKey: "user_id"});

  return {
    Attendee,
    AttendeeVote,
    Comment,
    CommentType,
    Event,
    EventProject,
    Mark,
    Participant,
    Project,
    ProjectHasProjectType,
    ProjectRubric,
    ProjectType,
    Role,
    Rubric,
    RubricCriterium,
    RubricNomination,
    User,
    UserProject,
    UserRole,
  };
}
module.exports = initModels;
module.exports.initModels = initModels;
module.exports.default = initModels;
