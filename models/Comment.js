const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('Comment', {
    id: {
      autoIncrement: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    rubric_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    comment: {
      type: DataTypes.TEXT,
      allowNull: false
    },
    comment_type_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    }
  }, {
    sequelize,
    tableName: 'comment',
    timestamps: false,
    indexes: [
      {
        name: "PRIMARY",
        unique: true,
        using: "BTREE",
        fields: [
          { name: "id" },
          { name: "comment_type_id" },
          { name: "rubric_id" },
        ]
      },
      {
        name: "rubric_id_idx_comment",
        using: "BTREE",
        fields: [
          { name: "rubric_id" },
        ]
      },
      {
        name: "comment_type_id_idx_comment",
        using: "BTREE",
        fields: [
          { name: "comment_type_id" },
        ]
      },
    ]
  });
};
