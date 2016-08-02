'use strict';

var purchaseHistory = {
  
  add: function(req, res){
    var workflow = req.app.utility.workflow(req, res);


    workflow.on('createPH', function() {
      var fieldsToSet = {
        orderNumber : req.body.orderNumber
      };

      req.app.db.models.PurchaseHistory.create(fieldsToSet, function(err, account) {
        if (err) {
          return workflow.emit('exception', err);
        } 

        
        });
      });

    workflow.emit('createPH');

    }
  
};

module.exports = purchaseHistory;
