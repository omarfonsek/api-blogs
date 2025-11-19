function model(sequelize, DataTypes) {
    const attributes = {
        id: {
            type: DataTypes.BIGINT,
            primaryKey: true,
            autoIncrement: true,
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
            allowNull: true,
            defaultValue: null
        },
        slug: {
            type: DataTypes.STRING(100),
            allowNull: false
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

    const _model = sequelize.define('category', attributes, options)
    _model.associate = function (models) {
        _model.belongsToMany(models.post, { through: "post_category", foreignKey: "categoryId" });
    };

    return _model;
}

module.exports = model;