const UserModel = require("../models/users.model");


class User {
    getUser = async (email) => {
        try {
            return await UserModel.findOne({ email: email });
        } catch (err) {
            console.log(err);
            return null;
        }
    };
    getUserbycarrito = async (idCarrito) => {
        try {
            return await UserModel.findOne({ cartId: idCarrito });
        } catch (err) {
            console.log(err);
            return null;
        }
    };
    saveUser = async (userData) => {
        try {
            return await UserModel.create(userData);
        } catch (err) {
            console.log(err);
            return null;
        }
    };
}
module.exports = User;
