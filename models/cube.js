const mongoose = require('mongoose');

const cubeSchema = new mongoose.Schema({
    id: Number,
    name: String,
    description: String,
    imageUrl: String,
    difficultyLevel: Number,
    accessory: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Accessory' }]
});

const accessorySchema = new mongoose.Schema({
    id: Number,
    name: String,
    description: String,
    imageUrl: String,
    difficultyLevel: Number,
    cubes: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Cube' }]
});

const Cube = mongoose.model('Cube', cubeSchema);
const Accessory = mongoose.model('Accessory', accessorySchema);

module.exports = {
    add: function (model, type) {
        let newEntity;
        if (type === 'Cube') {
            newEntity = new Cube(model);
        } else if (type === 'Accessory') {
            newEntity = new Accessory(model);
        }
        return new Promise(function (resolve, reject) {
            newEntity.save(function (err, model) {
                if (err) reject(err);
                console.log(`New ${type} added!`);
                resolve(model);
            });
        });
    },
    getAll: function (model) {
        return new Promise(function (resolve, reject) {
            model.find().lean().exec(function (err, result) {
                if (err) reject(err);
                resolve(result);
            });
        });
    },
    getOne: function (model, id) {
        return new Promise(function (resolve, reject) {
            model.findById(id).lean().populate('accessory').exec(function (err, result) {
                if (err) reject(err);
                resolve(result);
            });
        });
    },
    findAndUpdate: function (model, id, data) {
        return new Promise(function (resolve, reject) {
            let command = { "$push": data };

            if (!data.hasOwnProperty('accessory'))
                command = { ...data };

            model.findByIdAndUpdate({ _id: id }, command, function (err, result) {
                if (err) reject(err)
                resolve(result);
            });
        });
    },
    findAndDelete: function (model, id) {
        return new Promise(function (resolve, reject) {
            model.findByIdAndRemove({ _id: id }, function (err, result) {
                if (err) reject(err)
                resolve(result);
            });
        });
    },
}
