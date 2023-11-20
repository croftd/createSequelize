const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('ProjectHasProjectType', {
    project_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      references: {
        model: 'project',
        key: 'id'
      }
    },
    project_type_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      references: {
        model: 'project_type',
        key: 'id'
      }
    }
  }, {
    sequelize,
    tableName: 'project_has_project_type',
    timestamps: false,
    indexes: [
      {
        name: "PRIMARY",
        unique: true,
        using: "BTREE",
        fields: [
          { name: "project_id" },
          { name: "project_type_id" },
        ]
      },
      {
        name: "fk_project_has_project_type_project_type1_idx",
        using: "BTREE",
        fields: [
          { name: "project_type_id" },
        ]
      },
      {
        name: "fk_project_has_project_type_project1_idx",
        using: "BTREE",
        fields: [
          { name: "project_id" },
        ]
      },
    ]
  });
};
