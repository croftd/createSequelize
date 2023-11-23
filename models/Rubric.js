const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('Rubric', {
    id: {
      autoIncrement: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    type_id: {
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
    tableName: 'rubric',
    timestamps: false,
    indexes: [
      {
        name: "PRIMARY",
        unique: true,
        using: "BTREE",
        fields: [
          { name: "id" },
          { name: "type_id" },
        ]
      },
      {
        name: "type_id_idx",
        using: "BTREE",
        fields: [
          { name: "type_id" },
        ]
      },
    ]
  });
};
