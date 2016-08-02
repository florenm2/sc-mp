angular.module('account.purchaseHistory', ['config', 'account.settings.social', 'security.service', 'security.authorization', 'services.accountResource', 'services.utility','ui.bootstrap', 'directives.serverError']);
angular.module('account.purchaseHistory').config(['$routeProvider', 'securityAuthorizationProvider', function($routeProvider){
  $routeProvider
    .when('/account/purchaseHistory', {
      templateUrl: 'account/purchaseHistory/purchaseHistory.tpl.html',
      controller: 'PurchaseHistoryCtrl',
      title: 'Purchase History',
      resolve: {
        accountDetails: ['$q', '$location', 'securityAuthorization', 'accountResource' ,function($q, $location, securityAuthorization, accountResource){
          //get account details only for verified-user, otherwise redirect to /account/verification
          var redirectUrl;
          var promise = securityAuthorization.requireVerifiedUser()
            .then(accountResource.getAccountDetails, function(reason){
              //rejected either user is unverified or un-authenticated
              redirectUrl = reason === 'unverified-client'? '/account/verification': '/login';
              return $q.reject();
            })
            .catch(function(){
              redirectUrl = redirectUrl || '/account';
              $location.path(redirectUrl);
              return $q.reject();
            });
          return promise;
        }]
      }
    });
}]);
angular.module('account.purchaseHistory').controller('PurchaseHistoryCtrl', [ '$scope', '$location', '$log', 'security', 'utility', 'accountResource', 'accountDetails', 'SOCIAL',
  function($scope, $location, $log, security, utility, restResource, accountDetails, SOCIAL){
    //local vars

    var account = accountDetails.account;
    var user = accountDetails.user;
    var ph =  accountDetails.purchasehistory;

    console.log(accountDetails);
    console.log(account);
    console.log(account.purchaseHistoryLog);

    console.log(ph);

     $scope.print = null;
     $scope.exists = false;

     $scope.count = 0;
     $scope.myFunction = function() {
        $scope.count++;
    }

    $scope.hasError = utility.hasError;
    $scope.showError = utility.showError;
    $scope.canSave = utility.canSave;

    $scope.phDetail = {
      orderNumber:    ph.orderNumber,
      accountid: account._id
    };

     $scope.submit = function(){
      restResource.newPurchase($scope.phDetail).then(function(result){
        if(result.success){
          console.log(result.account);
        }else{
          //error due to server side validation
          angular.forEach(result.errors, function(err, index){
            console.log(err);
          });
        }
      }), function(x){
        console.log(x);
      }
    
     };

}]);


