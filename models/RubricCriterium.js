const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('RubricCriterium', {
    criteria_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      references: {
        model: 'criteria',
        key: 'id'
      }
    },
    mark: {
      type: DataTypes.INTEGER,
      allowNull: false
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
    tableName: 'rubric_criteria',
    timestamps: false,
    indexes: [
      {
        name: "PRIMARY",
        unique: true,
        using: "BTREE",
        fields: [
          { name: "criteria_id" },
          { name: "rubric_id" },
        ]
      },
      {
        name: "fk_criteria_has_role_criteria1_idx",
        using: "BTREE",
        fields: [
          { name: "criteria_id" },
        ]
      },
      {
        name: "fk_rubric_criteria_rubric1_idx",
        using: "BTREE",
        fields: [
          { name: "rubric_id" },
        ]
      },
    ]
  });
};
