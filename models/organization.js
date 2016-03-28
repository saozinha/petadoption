var mongoose     = require('mongoose');
var Schema       = mongoose.Schema;

var organizationSchema = new Schema({
  name: {type: String, trim: true, required: false},
  capacity: {type: Number, required: false},
  addresses: [{
    country: {type: String, trim: true, required: false},
    state: {type: String, trim: true, required: false},
    city: {type: String, trim: true, required: false},
    street: {type: String, trim: true, required: false},
    number: {type: String, trim: true, required: false},
    complement: {type: String, trim: true, required: false}
  }],
  shelter: [{
    _id: {type: Schema.Types.ObjectId, required: false}
  }],
  createdDate: {type: Date, default: Date.now},
  flActive: {type: Boolean, required: false}
});

module.exports = mongoose.model('Organization', organizationSchema);