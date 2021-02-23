module.exports = (sequelize, DataTypes) => {
    const User = sequelize.define('User', {
        firstName: {
            type: DataTypes.STRING,
            allowNull: false
        },
        lastName: {
            type: DataTypes.STRING,
            allowNull: false
        },
        email: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: true,
            validate: {
                isEmail: true
            }
        },
        isSubscribed: {
            type: DataTypes.BOOLEAN,
            defaultValue: true
        },
        timeZone: {
            type: DataTypes.STRING,
            allowNull: false
        },
        notifyAt: {
            type: DataTypes.DATE,
            allowNull: false
        }
    })

    User.associate = (models) => {
        User.belongsToMany(models.Subreddit, {
            foreignKey: 'userId',
            as: 'subreddits',
            through: 'user_subreddit'
        })
    }
    return User
}
