import * as mongoose from "mongoose";

import * as methods from './provider.methods';
import * as statics from './provider.statics';

const ProviderSchema = new mongoose.Schema({
    name: {
        type: String,
        trim: true,
    },
    key: String,
    description: {
        type: String,
        trim: true,
    },
    token: String,
    url: String,
    createdAt: { type: Number, default: Date.now },
    updatedAt: { type: Number, default: Date.now },
    deletedAt: Number,
}, {
    validateBeforeSave: false,
});

ProviderSchema.statics = statics;
ProviderSchema.methods = methods;
export { ProviderSchema };