const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

const userSchema = new mongoose.Schema({
    id: Number,
    username: String,
    password: String,
    created: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Cube' }]
});

const blacklistedTokens = new mongoose.Schema({
    token: String
});

const User = mongoose.model('User', userSchema);
const BlacklistToken = mongoose.model('BlacklistToken', blacklistedTokens);

module.exports = {
    add: function (user) {
        let newUser = new User(user);
        return new Promise(function (resolve, reject) {
            newUser.save(function (err, user) {
                if (err) reject(err);
                console.log(`${user.username} added!`);
                resolve(user);
            });
        });
    },
    getOne: function (model, id) {
        return new Promise(function (resolve, reject) {
            model.findById(id).lean().populate('created').exec(function (err, result) {
                if (err) reject(err);
                resolve(result);
            });
        });
    },
    getAll: function () {
        return new Promise(function (resolve, reject) {
            User.find().lean().exec(function (err, result) {
                if (err) reject(err);
                resolve(result);
            });
        });
    },
    findUser: function (username) {
        return new Promise(function (resolve, reject) {
            User.findOne({ username }).lean().exec(function (err, result) {
                if (err) reject(err);
                resolve(result);
            });
        });
    },
    findAndUpdate: function (model, id, data) {
        return new Promise(function (resolve, reject) {
            let command = { "$push": data };
            if (!data.hasOwnProperty('created'))
                command = { ...data };

            model.findByIdAndUpdate({ _id: id }, command, function (err, result) {
                if (err) reject(err)
                resolve(result);
            });
        });
    },
    verifyUser: function (userLogin, userDB) {
        return bcrypt.compareSync(userLogin.password, userDB.password);
    },
    hasher: function (user) {
        bcrypt.hash(user.password, 10, (err, hash) => {
            if (err) {
                console.error(err);
                return;
            }
            user.password = hash;
            this.add(user);
        });
    },
    blacklister: {
        addToBL: function (token) {
            let newToken = new BlacklistToken(token);
            return new Promise(function (resolve, reject) {
                newToken.save(function (err, newtoken) {
                    if (err) reject(err);
                    console.log(`${newtoken.token} blacklisted!`);
                    resolve(newtoken);
                });
            });
        },
        getAllBLtokens: function () {
            return new Promise(function (resolve, reject) {
                BlacklistToken.find().lean().exec(function (err, result) {
                    if (err) reject(err);
                    resolve(result);
                });
            });
        }
    }
}