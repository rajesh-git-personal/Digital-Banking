var myApp = angular.module('myApp', []);

myApp.controller('MainController', function($scope,apiFac) {

  /* NOTE: 
          1. string mentioned inside double quotes are scope properties
          2. string mentioned inside single quote are id of the html elements
  */
    
  $scope.init = function() {
    // provide valid values to the corresponding properties from problem statement
    $scope.bank1host = "";
    $scope.bank2host = "";
    $scope.bank1BasePath = "";
    $scope.bank2BasePath = "";
    $scope.accountBalanceApiPath = "";
    $scope.transactionsApiPath = "";
    $scope.bank1AccountId = "";
    $scope.bank2AccountId = "";
    $scope.bank1TransactionId = "";
    $scope.bank2TransactionId = "";

    // boolean properties which are used to display or hide
    $scope.showtransaction = true;
    $scope.showAggregation;
    $scope.show_bank1_dialog;
    $scope.show_bank2_dialog;
    $scope.show_agg_dialog;

    // get AccountBalance, TransactionDetails for both banks by default
  }

  $scope.getBank1AccountBalance = function() {
      
          // retrieve account balances for Bank 1 here using the factory getAccountbyId(..) and store the response in "accountFromB1"
  }

  $scope.getBank2AccountBalance = function() {
          // retrieve account balances for Bank 2 here using the factory getAccountbyId(..) and store the response in "accountFromB2"
  }

  $scope.getBank1TransactionDetails = function() {
      // retrieve Transaction details for Bank 1 here using the factory getTransactionsById(..) and store the response in "transactionArrayFromB1"
  }

  $scope.getBank2TransactionDetails = function() {
      // retrieve Transaction details for Bank 2 here using the factory getTransactionsById(..) and store the response in "transactionArrayFromB2"
  }

  $scope.firstClick = function() {
      // modify width of 'mySidebar' div tag as 250px
      // modify marginLeft of 'main' div tag as 250px  
  }

  $scope.closeNav = function() {
      // modify width of 'mySidebar' div tag as 0px
      // modify marginLeft of 'main' div tag as 0px
  }


  $scope.aggregationclick = function() {
      //display only 'show-aggregation' div tag using "showAggregation"

  }

  $scope.transactionclick = function() {
      //display only 'account-container' div tag using "showtransaction"

  }

  $scope.toggleBank1 = function() {
      //toggle only 'bank1-transactions' div tag using "show_bank1_dialog" and hide all others

  }

  $scope.toggleBank2 = function() {
      //toggle only 'bank2-transactions' div tag using "show_bank2_dialog" and hide all others

  }

  $scope.toggleAllBank = function() {
      //toggle only 'show-agg' div tag using "show_agg_dialog" and hide all others
      
  }

  $scope.init();
});
