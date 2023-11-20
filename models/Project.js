const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('Project', {
    id: {
      autoIncrement: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    theme: {
      type: DataTypes.STRING(45),
      allowNull: true
    },
    course_name: {
      type: DataTypes.STRING(45),
      allowNull: true
    },
    title: {
      type: DataTypes.STRING(45),
      allowNull: false
    },
    description: {
      type: DataTypes.STRING(45),
      allowNull: false
    }
  }, {
    sequelize,
    tableName: 'project',
    timestamps: false,
    indexes: [
      {
        name: "PRIMARY",
        unique: true,
        using: "BTREE",
        fields: [
          { name: "id" },
        ]
      },
    ]
  });
};
