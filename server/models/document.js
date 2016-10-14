const mongoose = require('mongoose');
const mongoosePaginate = require('mongoose-paginate');

const Schema = mongoose.Schema;

const documentSchema = new Schema({
  title: String,
  content: String,
  owner: String,
  permissions: String,
  createdAt: { type: Date, default: Date.now },
  modifiedAt: { type: Date, default: Date.now },
});
documentSchema.plugin(mongoosePaginate);
module.exports = mongoose.model('Document', documentSchema);
