const models = require('../database/models')

const createUser = async (data) => {
    let user = await models.user.findOne({ where: { email: data?.email } });
    if(user) return { status: 409, message: 'Already existy'}
    data = { ...data}
    user = await models.user.create(data);
    return { success: true, status: 200, message: 'User added to database', user}
}

const getAllUsers = async () => {
    const data = await models.user.findAll();
    return { success: true, data, status: 200};
}

const getUserById = async (id) => {
    const user = await models.user.findByPk(id);
    if(!user) return { success: false, status: 404, error: 'User Not Found' };
    return { success: true, data: user, status: 200 };
}

const updateUser = async (id, data) => {
    const user = await models.user.findByPk(id);
    if(!user) return { success: false, status: 404, message: 'User Not Found' }

    const cleanData = Object.keys(data).reduce((acc, key) => {
        if (data[key] !== undefined && data[key] !== null && data[key] !== '') {
            acc[key] = data[key];
        }
        return acc;
    }, {});

    const updatedUser = await user.update(cleanData);
    return { success: true, data: updatedUser, status: 200 };
}

const deleteUser = async (id) => {
    const user = await models.user.findByPk(id);
    if(!user) return { success: false, status: 404, message: 'User Not Found' }
    await user.destroy();
    return { success: true, data: {message: "User removed"}, status: 200 };
}

module.exports = { createUser, getAllUsers, getUserById, updateUser, deleteUser }