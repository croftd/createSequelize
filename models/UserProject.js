const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('UserProject', {
    user_iduser: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      references: {
        model: 'user',
        key: 'id'
      }
    },
    project_id_project: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      references: {
        model: 'project',
        key: 'id'
      },
      field: 'project_idProject'
    }
  }, {
    sequelize,
    tableName: 'user_project',
    timestamps: false,
    indexes: [
      {
        name: "PRIMARY",
        unique: true,
        using: "BTREE",
        fields: [
          { name: "user_iduser" },
          { name: "project_idProject" },
        ]
      },
      {
        name: "fk_user_has_project_project1_idx",
        using: "BTREE",
        fields: [
          { name: "project_idProject" },
        ]
      },
      {
        name: "fk_user_has_project_user_idx",
        using: "BTREE",
        fields: [
          { name: "user_iduser" },
        ]
      },
    ]
  });
};
