import mongoose from 'mongoose';

const storageSchema = new mongoose.Schema({
    totalStorage: { type: Number, required: true },
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    createdAt: { type: Date, default: Date.now },
});

export const StorageModel = mongoose.model('Storage', storageSchema);

//Actions
export const getStorageById = (id) => StorageModel.findById(id);
export const addNewStorage = (values) => new StorageModel(values).save().then((user) => user.toObject());
export const getStorageByUserId = (userId) => StorageModel.find({ user: userId }).sort({ _id: -1 });
export const updateStorageById = (id, values) => StorageModel.findByIdAndUpdate(id, values);
export const updateStorageByUserId = (userId, values) => StorageModel.findOneAndUpdate({ user: userId }, values);