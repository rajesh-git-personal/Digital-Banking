describe('Unit Test', function() {

  beforeEach(module('myApp'));

  var $controller;

  beforeEach(inject(function(_$controller_,_apiFac_, $compile, _$rootScope_, _$httpBackend_){
    $controller = _$controller_;
    apiFac = _apiFac_;
    compile = $compile;
    $rootScope = _$rootScope_;
    $httpBackend = _$httpBackend_;
  }));

  it('check the controller exists or not', function() {
      var $scope = {};
      var controller = $controller('MainController', { $scope: $scope });
      expect(controller).toBeDefined();
  });

  it('check the init method exists or not in controller', function() {
      var $scope = {};
      var controller = $controller('MainController', { $scope: $scope });
      expect($scope.init).toBeDefined();
  });

  it('should call getBank1AccountBalance method on page load (by default)', function() {
    var $scope = {};
    var controller = $controller('MainController', { $scope: $scope });
     var spy = spyOn($scope, 'getBank1AccountBalance').and.callThrough();
    $scope.init();
    expect($scope.getBank1AccountBalance).toHaveBeenCalled();
  });

  it('should call getBank2AccountBalance method on page load (by default)', function() {
    var $scope = {};
    var controller = $controller('MainController', { $scope: $scope });
     var spy = spyOn($scope, 'getBank2AccountBalance').and.callThrough();
    $scope.init();
    expect($scope.getBank2AccountBalance).toHaveBeenCalled();
  });

  it('should call getBank1TransactionDetails method on page load (by default)', function() {
    var $scope = {};
    var controller = $controller('MainController', { $scope: $scope });
     var spy = spyOn($scope, 'getBank1TransactionDetails').and.callThrough();
    $scope.init();
    expect($scope.getBank1TransactionDetails).toHaveBeenCalled();
  });

  it('should call getBank2TransactionDetails method on page load (by default)', function() {
    var $scope = {};
    var controller = $controller('MainController', { $scope: $scope });
     var spy = spyOn($scope, 'getBank2TransactionDetails').and.callThrough();
    $scope.init();
    expect($scope.getBank2TransactionDetails).toHaveBeenCalled();
  });

  it('should call getAccountbyId method in factory when getBank1AccountBalance function of controller have been called', function() {
    var $scope = {};
    var controller = $controller('MainController', { $scope: $scope });
    
    var spy = spyOn(apiFac, 'getAccountbyId').and.callThrough();
    $scope.getBank1AccountBalance();
    expect(spy).toHaveBeenCalled()
  });

  it('should call getAccountbyId method in factory when getBank2AccountBalance function of controller have been called', function() {
    var $scope = {};
    var controller = $controller('MainController', { $scope: $scope });
    
    var spy = spyOn(apiFac, 'getAccountbyId').and.callThrough();
    $scope.getBank1AccountBalance();
    expect(spy).toHaveBeenCalled()
  });

  it('should return accountResponse response while hits api', function () {

    const bankhost = 'models';
    const bankBasePath = '/united-federation-bank';
    const accountBalanceApiPath = '/account/';
    const accountId = 'ufbAccount.json';
    const mockRes_GetAccountbyId = {
      "userId": "320375648",
      "accountId": "00355642136",
      "balance": "134267",
      "bankName": "United Federation Bank",
      "accountType": "Salary Account",
      "currency": "INR"
    };
    $httpBackend.whenGET('models/united-federation-bank/account/ufbAccount.json').respond(mockRes_GetAccountbyId);
    apiFac.getAccountbyId(bankhost, bankBasePath, accountBalanceApiPath, accountId).then(function(response) {
      expect(this.accountResponse).toBe(response);
    })
    $httpBackend.flush();
  });

  it('should return transactionResponse response while hits api', function () {

    const bankhost = 'models';
    const bankBasePath = '/united-federation-bank';
    const transactionsApiPath = '/transactions/';
    const transactionId = 'ufbAccount.json';
    const mockRes_GetTransactionsbyId = [
      {
        "date": "2018-11-21",
        "amount": "1500",
        "type": "Debit",
        "source": "ATM",
        "bank": "United Federation Bank"
      },
      {
        "date": "2018-11-01",
        "amount": "21000",
        "type": "Debit",
        "source": "NetBanking",
        "bank": "United Federation Bank"
      }
    ];
    $httpBackend.whenGET('models/united-federation-bank/transactions/ufbAccount.json').respond(mockRes_GetTransactionsbyId);
    apiFac.getTransactionsById(bankhost, bankBasePath, transactionsApiPath, transactionId).then(function(response) {
      expect(this.transactionResponse).toBe(response);
    })
    $httpBackend.flush();
  });

  it('should get response from factory and should store in corresponding properties for bank1 ', function () { 
    var $scope = {};
    var controller = $controller('MainController', { $scope: $scope });

    const mockRes_GetAccountbyId = {
      "userId": "320375648",
      "accountId": "00355642136",
      "balance": "134267",
      "bankName": "United Federation Bank",
      "accountType": "Salary Account",
      "currency": "INR"
    };
    const mockRes_GetTransactionsbyId = [
      {
        "date": "2018-11-21",
        "amount": "1500",
        "type": "Debit",
        "source": "ATM",
        "bank": "United Federation Bank"
      },
      {
        "date": "2018-11-01",
        "amount": "21000",
        "type": "Debit",
        "source": "NetBanking",
        "bank": "United Federation Bank"
      }
    ];

    $scope.getBank1AccountBalance();
    $scope.getBank1TransactionDetails();
    $httpBackend.whenGET('models/united-federation-bank/account/ufbAccount.json').respond(mockRes_GetAccountbyId);
    $httpBackend.whenGET('models/united-federation-bank/transactions/ufbTransactions.json').respond(mockRes_GetTransactionsbyId);
    $httpBackend.whenGET('models/the-ferengi-commerce-bank/account/tfcbAccount.json').respond(200);
    $httpBackend.whenGET('models/the-ferengi-commerce-bank/transactions/tfcbTransactions.json').respond(200);

    apiFac.getAccountbyId($scope.bank1host, $scope.bank1BasePath, $scope.accountBalanceApiPath,  $scope.bank1AccountId).then(function(response) {
      expect($scope.accountFromB1).toEqual(response);
    })

    apiFac.getTransactionsById( $scope.bank1host, $scope.bank1BasePath,  $scope.transactionsApiPath,  $scope.bank1TransactionId).then(function(response){
        expect($scope.transactionArrayFromB1).toEqual(response);
    });

    $httpBackend.flush();
  });

  it('should get response from factory and should store in corresponding properties for bank2 ', function () { 
    var $scope = {};
    var controller = $controller('MainController', { $scope: $scope });

    const mockRes_GetAccountbyId = {
      "userId": "320375648",
      "accountId": "00355642136",
      "balance": "134267",
      "bankName": "United Federation Bank",
      "accountType": "Salary Account",
      "currency": "INR"
    };
    const mockRes_GetTransactionsbyId = [
      {
        "date": "2018-11-21",
        "amount": "1500",
        "type": "Debit",
        "source": "ATM",
        "bank": "United Federation Bank"
      },
      {
        "date": "2018-11-01",
        "amount": "21000",
        "type": "Debit",
        "source": "NetBanking",
        "bank": "United Federation Bank"
      }
    ];

    $scope.getBank2AccountBalance();
    $scope.getBank2TransactionDetails();
    $httpBackend.whenGET('models/united-federation-bank/account/ufbAccount.json').respond(200);
    $httpBackend.whenGET('models/united-federation-bank/transactions/ufbTransactions.json').respond(200);
    $httpBackend.whenGET('models/the-ferengi-commerce-bank/account/tfcbAccount.json').respond(mockRes_GetAccountbyId);
    $httpBackend.whenGET('models/the-ferengi-commerce-bank/transactions/tfcbTransactions.json').respond(mockRes_GetTransactionsbyId);

    apiFac.getAccountbyId($scope.bank2host, $scope.bank2BasePath, $scope.accountBalanceApiPath,  $scope.bank2AccountId).then(function(response) {
      expect($scope.accountFromB2).toEqual(response);
    })

    apiFac.getTransactionsById( $scope.bank1host, $scope.bank2BasePath,  $scope.transactionsApiPath,  $scope.bank2TransactionId).then(function(response){
        expect($scope.transactionArrayFromB2).toEqual(response);
    });

    $httpBackend.flush();
  });

  it('should only display Aggregation div while clicking on Account Aggregation in the menu', function() {
      var $scope = {};
      var controller = $controller('MainController', { $scope: $scope });
      $scope.aggregationclick();
      expect($scope.showtransaction).toBe(false);
      expect($scope.show_bank2_dialog).toBe(false);
      expect($scope.show_agg_dialog).toBe(false);
      expect($scope.show_bank1_dialog).toBe(false);
      expect($scope.showAggregation).toBe(true);
  });

  it('should only display transaction div while clicking on Transactions in the menu', function() {
      var $scope = {};
      var controller = $controller('MainController', { $scope: $scope });
      $scope.transactionclick();
      expect($scope.showtransaction).toBe(true);
      expect($scope.show_bank2_dialog).toBe(false);
      expect($scope.show_agg_dialog).toBe(false);
      expect($scope.show_bank1_dialog).toBe(false);
      expect($scope.showAggregation).toBe(false);
  });

  it('should toggle Bank1 transaction details div while clicking Transaction Details button of Bank1', function() {
      var $scope = {};
      var controller = $controller('MainController', { $scope: $scope });
      $scope.toggleBank1();
      expect($scope.show_bank2_dialog).toBe(false);
      expect($scope.show_agg_dialog).toBe(false);
      expect($scope.show_bank1_dialog).toBe(true);
      $scope.toggleBank1();
      expect($scope.show_bank1_dialog).toBe(false);
  });

  it('should toggle Bank2 transaction details div while clicking Transaction Details button of Bank2', function() {
      var $scope = {};
      var controller = $controller('MainController', { $scope: $scope });
      $scope.toggleBank2();
      expect($scope.show_bank2_dialog).toBe(true);
      expect($scope.show_agg_dialog).toBe(false);
      expect($scope.show_bank1_dialog).toBe(false);
      $scope.toggleBank2();
      expect($scope.show_bank2_dialog).toBe(false);
  });

  it('should toggle Aggregated Details from All banks transaction details div while clicking Transaction Details button of Aggregated Details from All banks', function() {
      var $scope = {};
      var controller = $controller('MainController', { $scope: $scope });
      $scope.toggleAllBank();
      expect($scope.show_bank2_dialog).toBe(false);
      expect($scope.show_agg_dialog).toBe(true);
      expect($scope.show_bank1_dialog).toBe(false);
      $scope.toggleAllBank();
      expect($scope.show_agg_dialog).toBe(false);
  });

});

