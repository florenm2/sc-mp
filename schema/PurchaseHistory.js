'use strict';

exports = module.exports = function(app, mongoose) {
  var purchaseHistorySchema = new mongoose.Schema({
    account: {
      id: { type: mongoose.Schema.Types.ObjectId, ref: 'Account' },
      name: { type: String, default: '' }
    },
    user: {
      id: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
      name: { type: String, default: '' }
    },
    orderNumber: { type: String, default: ''},
    sizeID: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    billingAddress: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    mailingAddress: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    orderDate: { type: Date, default: Date.now },
	  completedDate: { type: Date },
    completed: { type: Boolean },
    cost: {
      raw: { type: String },
      shipping: { type: String },
      tax: { type: String },
      total: { type: String }
  	},
    search: [String]
  });
  purchaseHistorySchema.plugin(require('./plugins/pagedFind'));
  purchaseHistorySchema.index({ orderNumber: 1 });
  purchaseHistorySchema.index({ account: 1 });
  purchaseHistorySchema.set('autoIndex', (app.get('env') === 'development'));
  app.db.model('PurchaseHistory', purchaseHistorySchema);
};
