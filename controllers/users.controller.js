const db = require("../models");
const Users = db.users;
const Op = db.Sequelize.Op;

exports.getAllUsers = (req, res) => {
    Users.findAll()
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                message: "Error: Cannot get users."
            })
        });
};

exports.addUser = (req, res) => {
    if (!req.body.fullName) {
        res.status(400).send({
            message: "Name cannot be empty."
        });
        return;
    }

    if (!req.body.username) {
        res.status(400).send({
            message: "Username cannot be empty."
        });
        return;
    }

    if (!req.body.password) {
        res.status(400).send({
            message: "Password cannot be empty."
        });
        return;
    }

    if (!req.body.email) {
        res.status(400).send({
            message: "Email cannot be empty."
        });
        return;
    }

    const user = {
        fullName: req.body.fullName,
        username: req.body.username,
        password: req.body.password,
        email: req.body.email
    }
    
    Users.create(user)
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                message: "Error: Cannot add user."
            });
        });
};

exports.auth = async (req, res) => {
    if (!req.body.username) {
        res.status(400).send({
            message: "Username cannot be empty."
        });
        return;
    }

    if (!req.body.password) {
        res.status(400).send({
            message: "Password cannot be empty."
        });
        return;
    }
    const loginuser = await Users.findOne({
        where: {
          username: req.body.username,
          password: req.body.password
        }
        })
        .then(loginuser => {
            if (loginuser) {
                res.send(loginuser);
            }
            else {
                res.status(500).send({
                    message: "Error: Login Failed."
                })
            }
            
        })
        .catch(err => {
            res.status(500).send({
                message: "Error: Login Failed. Please Try Again."
            })
        });
};

exports.deleteUser = (req, res) => {
    User.destroy({
        where: {
            userID: req.body.userID
        }
    })
    .then(data => {
        res.send(data)
    })
    .catch(err => {
        res.status(500).send({
            message:"Error: Cannot delete user."
        })
    });
};

exports.getUserEmails = (req, res) => {
    User.findAll({
        attributes: ['email']
    })
    .then(data => {
        res.send(data)
    })
    .catch(err => {
        res.status(500).send({
            message: "Error: Cannot delete user."
        })
    });
}


exports.getUserInfo = (req, res) => {
    User.findAll({
        where: {
            userID: req.body.userID
        }
    })
    .then(data => {
        res.send(data)
    })
    .catch(err => {
        res.status(500).send({
            message: "Error: Cannot get user info."
        })
    });
}