function model(sequelize, DataTypes) {
    const attributes = {
        id: {
            type: DataTypes.BIGINT,
            primaryKey: true,
            autoIncrement: true,
            allowNull: false
        },
        authorId: {
            type: DataTypes.BIGINT,
            allowNull: false
        },
        parentId: {
            type: DataTypes.BIGINT,
            allowNull: true,
            defaultValue: null
        },
        title: {
            type: DataTypes.STRING(75),
            allowNull: false
        },
        metaTitle: {
            type: DataTypes.STRING(100),
            allowNull: true
        },
        slug: {
            type: DataTypes.STRING(100),
            allowNull: false,
            unique: true
        },
        summary: {
            type: DataTypes.TEXT('tiny'),
            allowNull: true
        },
        published: {
            type: DataTypes.BOOLEAN(1),
            allowNull: false,
            defaultValue: 0
        },
        createdAt: {
            type: DataTypes.DATE,
            allowNull: false,
        },
        updatedAt: {
            type: DataTypes.DATE,
            allowNull: true,
            defaultValue: null
        },
        publishedAt: {
            type: DataTypes.DATE,
            allowNull: true,
            defaultValue: null
        },

    };

    const options = {
        timestamps: false,
        freezeTableName: true
    };

    const _model = sequelize.define('post', attributes, options)
        _model.associate = function (models) {
            _model.belongsTo(models.user, {
            foreignKey: "authorId",
            as: "author",
            });

            _model.hasMany(models.post_comment, {
                foreignKey: 'postId',
                as: 'comment'
            });

            _model.hasMany(models.post_meta, {
                foreignKey: 'postId',
                as: 'metadata'
            });

            _model.belongsToMany(models.category, { through: "post_category", foreignKey: "postId" });

            _model.belongsToMany(models.tag, { through: "post_tag", foreignKey: "postId" });
        };

    return _model;

}

module.exports = model;