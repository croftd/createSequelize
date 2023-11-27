const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('RubricNomination', {
    rubric_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    adjudimentor_user_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    }
  }, {
    sequelize,
    tableName: 'rubric_nomination',
    timestamps: false,
    indexes: [
      {
        name: "PRIMARY",
        unique: true,
        using: "BTREE",
        fields: [
          { name: "adjudimentor_user_id" },
          { name: "rubric_id" },
        ]
      },
      {
        name: "rubric_id_idx_nomination",
        using: "BTREE",
        fields: [
          { name: "rubric_id" },
        ]
      },
      {
        name: "adjudimentor_user_id_idx_nomination",
        using: "BTREE",
        fields: [
          { name: "adjudimentor_user_id" },
        ]
      },
    ]
  });
};
