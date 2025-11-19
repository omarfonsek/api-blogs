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
            allowNull: true
        },
        key: {
            type: DataTypes.STRING(50),
            allowNull: false
        },
        content: {
            type: DataTypes.TEXT,
            allowNull: true,
            defaultValue: null
        },
    };

     const options = {
        timestamps: false,
        freezeTableName: true
    };

    const _model = sequelize.define('post_meta', attributes, options)
        _model.associate = function (models) {
            _model.belongsTo(models.post, {
                foreignKey: "postId",
                    as: "post"
            });
        };

        return _model;
}

module.exports = model;
