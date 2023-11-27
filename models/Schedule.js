const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
    const Schedule = sequelize.define('Schedule', {
        id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            autoIncrement: true,
            primaryKey: true
        },
        event_id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            references: {
                model: 'event',
                key: 'id'
            }
        },
        project_id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            references: {
                model: 'project',
                key: 'id'
            }
        },
        start_time: {
            type: DataTypes.DATE,
            allowNull: false
        },
        end_time: {
            type: DataTypes.DATE,
            allowNull: false
        },
        event_type: {
            type: DataTypes.STRING(45),
            allowNull: false
        },
        location: {
            type: DataTypes.STRING(45),
            allowNull: true
        }
    }, {
        sequelize,
        tableName: 'schedule',
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

    // Associations can be defined here
    Schedule.associate = function(models) {
        // Associating Schedule with Event
        Schedule.belongsTo(models.Event, {
            foreignKey: 'event_id',
            as: 'event'
        });

        // Associating Schedule with Project
        Schedule.belongsTo(models.Project, {
            foreignKey: 'project_id',
            as: 'project'
        });
    };
};