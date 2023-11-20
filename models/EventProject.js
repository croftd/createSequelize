const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('EventProject', {
    event_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      references: {
        model: 'event',
        key: 'id'
      }
    },
    project_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      references: {
        model: 'project',
        key: 'id'
      }
    }
  }, {
    sequelize,
    tableName: 'event_project',
    timestamps: false,
    indexes: [
      {
        name: "PRIMARY",
        unique: true,
        using: "BTREE",
        fields: [
          { name: "event_id" },
          { name: "project_id" },
        ]
      },
      {
        name: "fk_event_has_project_project1_idx",
        using: "BTREE",
        fields: [
          { name: "project_id" },
        ]
      },
      {
        name: "fk_event_has_project_event1_idx",
        using: "BTREE",
        fields: [
          { name: "event_id" },
        ]
      },
    ]
  });
};
