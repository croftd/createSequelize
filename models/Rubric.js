const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('Rubric', {
    id: {
      autoIncrement: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    is_nominated: {
      type: DataTypes.TINYINT,
      allowNull: false
    },
    glow_comment: {
      type: DataTypes.STRING(45),
      allowNull: true
    },
    grow_comment: {
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
    adjudimentor_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      references: {
        model: 'user',
        key: 'id'
      }
    }
  }, {
    sequelize,
    tableName: 'rubric',
    timestamps: false,
    indexes: [
      {
        name: "PRIMARY",
        unique: true,
        using: "BTREE",
        fields: [
          { name: "id" },
          { name: "project_id" },
          { name: "adjudimentor_id" },
        ]
      },
      {
        name: "fk_rubric_project1_idx",
        using: "BTREE",
        fields: [
          { name: "project_id" },
        ]
      },
      {
        name: "fk_rubric_user1_idx",
        using: "BTREE",
        fields: [
          { name: "adjudimentor_id" },
        ]
      },
    ]
  });
};
