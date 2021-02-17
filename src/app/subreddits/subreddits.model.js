module.exports = (sequelize, DataTypes) => {
    const Subreddit = sequelize.define('subreddit', {
        name: {
            type: DataTypes.STRING,
            allowNull: false
        }
    })

    Subreddit.associate = models => {
        Subreddit.belongsTo(models.User)
    }

    return Subreddit
}