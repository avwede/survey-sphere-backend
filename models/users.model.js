// This Sequelize Model represents the 'users' table in 
// our CockroachDB database. Sequelize will automatically
// support our CRUD functions. 
module.exports = userModel = (sequelize, Sequelize) => {
    const Users = sequelize.define("users", {
        userID: {
            type: Sequelize.INTEGER, 
            autoIncrement: true, 
            primaryKey: true
        },
        fullName: {
            type: Sequelize.STRING
        },
        username: {
            type: Sequelize.STRING
        },
        password: {
            type: Sequelize.STRING
        },
        email: {
            type: Sequelize.STRING
        }
    });

    return Users;
};