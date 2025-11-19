function model(sequelize, DataTypes) {
    const attributes = {
        id: {
            type: DataTypes.BIGINT,
            primaryKey: true,
            autoIncrement: true,
            allowNull: false
        },
        firstName: {
            type: DataTypes.STRING(50),
            allowNull: true,
            defaultValue: null
        },
        middleName: {
            type: DataTypes.STRING(50),
            allowNull: true,
            defaultValue: null
        },
        lastName: {
            type: DataTypes.STRING(50),
            allowNull: true,
            defaultValue: null
        },
        mobile: {
            type: DataTypes.STRING(15),
            allowNull: true,
            unique: true,
        },
        email: {
            type: DataTypes.STRING(50),
            allowNull: true,
            unique: true,
            validate: {
                isEmail: true
            },
        },
        passwordHash: {
            type: DataTypes.STRING(32),
            allowNull: false
        },
        registeredAt: {
            type: DataTypes.DATE,
            allowNull: false
        },
        lastLogin: {
            type: DataTypes.DATE,
            allowNull: true,
            defaultValue: null
        },
        intro: {
            type: DataTypes.TEXT('tiny'),
            allowNull: true,
            defaultValue: null
        },
        profile: {
            type: DataTypes.TEXT,
            allowNull: true,
            defaultValue: null
        },
        country: {
            type: DataTypes.STRING(100),
            allowNull: true,
            defaultValue: null
        },
        
    };

    const options = {
        timestamps: true,
        freezeTableName: true
    };

    const _model = sequelize.define('user', attributes, options)
    _model.associate = function(models) {
        _model.hasMany(models.post, {
            foreignKey: 'authorId',
            as: 'post'
        });
    };

    return _model;
}

module.exports = model;