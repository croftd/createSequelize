const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('Participant', {
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      comment: "This is the id of the user (a participant is a type of user)"
    },
    is_undergrad: {
      type: DataTypes.TINYINT,
      allowNull: false
    },
    major: {
      type: DataTypes.STRING(45),
      allowNull: false
    },
    campus: {
      type: DataTypes.STRING(45),
      allowNull: false
    },
    course_code: {
      type: DataTypes.STRING(45),
      allowNull: false
    },
    viu_advisor: {
      type: DataTypes.STRING(45),
      allowNull: false
    },
    user_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    group_member_1_name: {
      type: DataTypes.STRING(45),
      allowNull: true,
      comment: "The group_member fields were added to store the names of group members - these will be null if it is an individual project",
      field: 'group_member1_name'
    },
    group_member_2_name: {
      type: DataTypes.STRING(45),
      allowNull: true,
      field: 'group_member2_name'
    },
    group_member_3_name: {
      type: DataTypes.STRING(45),
      allowNull: true,
      field: 'group_member3_name'
    },
    group_member_4_name: {
      type: DataTypes.STRING(45),
      allowNull: true,
      field: 'group_member4_name'
    }
  }, {
    sequelize,
    tableName: 'participant',
    timestamps: false,
    indexes: [
      {
        name: "PRIMARY",
        unique: true,
        using: "BTREE",
        fields: [
          { name: "id" },
          { name: "user_id" },
        ]
      },
      {
        name: "fk_participant_user1_idx",
        using: "BTREE",
        fields: [
          { name: "user_id" },
        ]
      },
    ]
  });
};
