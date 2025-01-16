import mongoose from 'mongoose';

const usageSchema = new mongoose.Schema({
    totalUsage: { type: Number, required: true },
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    createdAt: { type: Date, default: Date.now },
});

export const usageModel = mongoose.model('usage', usageSchema);

//Actions
export const getUsageById = (id) => usageModel.findById(id);
export const addNewUsage = (values) => new usageModel(values).save().then((user) => user.toObject());
export const getUsageByUserId = (userId) => usageModel.find({ user: userId }).sort({ _id: -1 });
export const updateUsageById = (id, values) => usageModel.findByIdAndUpdate(id, values);
export const updateUsageByUserId = (userId, values) => usageModel.findOneAndUpdate({ user: userId }, values);