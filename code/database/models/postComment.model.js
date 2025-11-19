function model(sequelize, DataTypes) {
    const attributes = {
        id: {
            type: DataTypes.BIGINT,
            primaryKey: true,
            autoIncrement: true,
            allowNull: false
        },
        postId: {
            type: DataTypes.BIGINT,
            allowNull: false
        },
        parentId: {
            type: DataTypes.BIGINT,
            allowNull: true,
            defaultValue: null
        },
        title: {
            type: DataTypes.STRING(100),
            allowNull: false
        },
        published: {
            type: DataTypes.BOOLEAN(1),
            allowNull: false,
            defaultValue: 0
        },
        createdAt: {
            type: DataTypes.DATE,
            allowNull: false
        },
        publishedAT: {
            type: DataTypes.DATE,
            allowNull: true,
            defaultValue: null
        },
        content: {
            type: DataTypes.TEXT,
            allowNull: true,
            defaultValue: null
        }
        
    };

    const options = {
        timestamps: false,
        freezeTableName: true
    };

    const _model = sequelize.define('post_comment', attributes, options)
        _model.associate = function (models) {
            _model.belongsTo(models.post, {
                foreignKey: "postId",
                as: "post",
            });
        };

        return _model;
}

module.exports = model;