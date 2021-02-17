module.exports = (sequelize, DataTypes) => {
    const User = sequelize.define('user', {
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
            allowNull: false
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
