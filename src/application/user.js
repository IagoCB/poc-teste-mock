const { UserModel } = require('../infrastructure/database');

const User = {

    async createUser(data) {
        try {
            const model = new UserModel(data);
            const result = await model.save();
            if (result.id) return { id: result.id };
            return result;
        } catch (e) {
            return e;
        }
    },

    async editUser(data) {
        try {
            const update = { name: data.name };
            const filter = { email: data.email, id: data.id };
            const result = await UserModel.findOneAndUpdate(filter, update, { new: true }).exec();
            if (result) return result.toObject();
            return null;
        } catch (e) {
            return e;
        }
    },

    async listUsers(data) {
        try {
            const result = await UserModel.find(data, '-id').exec();
            return result;
        } catch (e) {
            return e;
        }
    },

    async deleteUser(user) {
        try {
            const result = await UserModel.deleteOne(user).exec();
            return result.deletedCount;
        } catch (e) {
            return e;
        }
    },
};

module.exports = User;