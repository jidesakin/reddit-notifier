module.exports = (sequelize, DataTypes) => {
    const Subreddit = sequelize.define('Subreddit', {
        name: {
            type: DataTypes.STRING,
            allowNull: false
        }
    })

    Subreddit.associate = (models) => {
        Subreddit.belongsToMany(models.User, {
            as: 'users',
            foreignKey: 'subredditId',
            through: 'user_subreddit'
        })
    }

    return Subreddit
}