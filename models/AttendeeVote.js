const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('AttendeeVote', {
    vote: {
      type: DataTypes.STRING(45),
      allowNull: true
    },
    project_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      references: {
        model: 'project',
        key: 'id'
      }
    },
    attendee_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      references: {
        model: 'attendee',
        key: 'id'
      }
    }
  }, {
    sequelize,
    tableName: 'attendee_vote',
    timestamps: false,
    indexes: [
      {
        name: "PRIMARY",
        unique: true,
        using: "BTREE",
        fields: [
          { name: "project_id" },
          { name: "attendee_id" },
        ]
      },
      {
        name: "fk_attendee_vote_project1_idx",
        using: "BTREE",
        fields: [
          { name: "project_id" },
        ]
      },
      {
        name: "fk_attendee_vote_attendee1_idx",
        using: "BTREE",
        fields: [
          { name: "attendee_id" },
        ]
      },
    ]
  });
};
