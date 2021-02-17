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
        }
    })

    User.associate = (models) => {
        User.hasMany(models.Subreddit, {
            foreignKey: 'userId',
            as: 'subreddits'
        })
    }
    return User
}
