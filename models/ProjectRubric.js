const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('ProjectRubric', {
    project_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      references: {
        model: 'project',
        key: 'id'
      }
    },
    rubric_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      references: {
        model: 'rubric',
        key: 'id'
      }
    }
  }, {
    sequelize,
    tableName: 'project_rubric',
    timestamps: false,
    indexes: [
      {
        name: "PRIMARY",
        unique: true,
        using: "BTREE",
        fields: [
          { name: "project_id" },
          { name: "rubric_id" },
        ]
      },
      {
        name: "project_id_idx",
        using: "BTREE",
        fields: [
          { name: "project_id" },
        ]
      },
      {
        name: "rubric_id_idx",
        using: "BTREE",
        fields: [
          { name: "rubric_id" },
        ]
      },
    ]
  });
};
