myApp.factory('apiFac',function($http) {
    var apiFac ={};

    apiFac.getAccountbyId = function(bankhost, bankBasePath, accountBalanceApiPath, accountId){
        // should fetch account balance and store the response in "accountResponse"
    };

    apiFac.getTransactionsById = function(bankhost, bankBasePath, transactionsApiPath, transactionId){
        // should fetch Transaction details and store the response in "transactionResponse"
    };

    return apiFac;
  });