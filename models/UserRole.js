const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('UserRole', {
    user_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      references: {
        model: 'user',
        key: 'id'
      }
    },
    role_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      references: {
        model: 'role',
        key: 'id'
      }
    }
  }, {
    sequelize,
    tableName: 'user_role',
    timestamps: false,
    indexes: [
      {
        name: "PRIMARY",
        unique: true,
        using: "BTREE",
        fields: [
          { name: "user_id" },
          { name: "role_id" },
        ]
      },
      {
        name: "fk_user_has_role_role1_idx",
        using: "BTREE",
        fields: [
          { name: "role_id" },
        ]
      },
      {
        name: "fk_user_has_role_user1_idx",
        using: "BTREE",
        fields: [
          { name: "user_id" },
        ]
      },
    ]
  });
};
