function model(sequelize, DataTypes) {
    const attributes = {
        id: {
            type: DataTypes.BIGINT,
            primaryKey: true,
            autoIncrement: true,
            allowNull: false
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

    const _model = sequelize.define('tag', attributes, options)
        _model.associate = function (models) {
            _model.belongsToMany(models.post , { through: "post_tag", foreignKey: "tagId" });
        };

        return _model;

}

module.exports = model;