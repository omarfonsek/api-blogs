const service = require('./user.service');

const create = (req, res, next) => {
    service
        .createUser(req.body)
        .then((data) => {
            res.status(data.status);
            res.json(data);
        })
        .catch(next);
}

const get = (req, res, next) => {
    const { id } = req.query;

    if (id) {
        service
            .getUserById(id)
            .then((result) => {
                res.status(result.status).json(result);
            })
            .catch(next);
    }
    else {
        service
            .getAllUsers()
            .then((result) => {
                res.status(result.status).json(result);
            })
            .catch(next);
    }

}

const update = (req, res, next) => {
    const { id } = req.params;
    const data = req.body;
    service
        .updateUser(id, data)
        .then((result) => {
            if (result.success) {
                res.status(result.status).json(result.data);
            }
            else {
                res.status(result.status).json({ error: result.error });
            }
        })
        .catch(next);
}

const remove = (req, res, next) => {
    const { id } = req.query;

    service
        .deleteUser(id)
        .then((result) => {
            if (result.success) {
                res.status(result.status).json(result.data);
            }
            else {
                res.status(result.status).json({ error: result.error });
            }
        })
        .catch(next);
}

module.exports = { create, get, update, remove }