const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const CategorySchema = new Schema({
  category: { type: mongoose.Schema.Types.ObjectId, ref: 'Category' },
  name: String
});

const ItemSchema = new Schema(
  {
    title: {
      type: String,
      required: true, 
      trim: true
    },
    author: {
      type: String,
      required: true, 
      trim: true
    },
    content: String,
    cover: { type: mongoose.Schema.Types.ObjectId, ref: 'File' },
    type: String,
    status: {
      type: String,
      default: 'pending',
      lowercase: true,
      enum: ['published', 'pending', 'waiting', 'rejected', 'draft']
    },
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    extraFields: Object,
    categories: [CategorySchema],
    collectedBy: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }],
    rateCount: { type: Number, default: 0 },
    rateValue: { type: Number, default: 0 },
    rateAverage: { type: Number, default: 0 }
  },
  { timestamps: true }
);

ItemSchema.index({title: 'text', author: 'text'})

module.exports = mongoose.model('Item', ItemSchema);
