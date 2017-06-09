var _ = require('lodash');

function loginController($state, $scope, $log, localStorageService, AuthService,
  $window, CommonService, $timeout, StockService) {
  this.text = 'My brand new component!';
  this.user = {};
  var vm = this;
  $timeout(function () {
    vm.showPanel = 'auth';
  }, 300);

  this.checkLoggedIn = function () {
    var states = [];
    AuthService
      .retrieveUser()
      .then(function (user) {
        $log.log('user is logged in');
        // $state.go('base.dashboard'); // or any other state that has been requested by the user
      }).catch(function (error) {
        $log.error(error);
        // $state.go('auth');
      });
  };

  this.login = function () {
    vm.signUpLoading = true;
    var perms;
    var user, role;
    AuthService.logIn(vm.user)
      .then(function (u) {
        user = u;
        $log.log(user);
        return CommonService.getStates();
      })
      .then(function (allStates) {
        localStorageService.set('states', allStates);
        var states = _.map(allStates, 'state');
        // PermPermissionStore
        //   .defineManyPermissions(states, function (permissionName,
        //     transitionProperties) {
        //     return _.contains(perms.accessArray, permissionName);
        //   });
        // PermRoleStore.defineRole(perms.role, perms.accessArray);
        return AuthService.getTaxes();
      })
      .then(function (taxes) {
        localStorageService.set('taxes', angular.toJson(taxes));
        return CommonService.getColors();
      })
      .then(function (colors) {
        localStorageService.set('colors', angular.toJson(colors));
        return CommonService.getPaymentModes();
      })
      .then(function (paymentModes) {
        localStorageService.set('modes', angular.toJson(paymentModes.modes));
        localStorageService.set('wallets', angular.toJson(paymentModes.wallets));
        localStorageService.set('prepaids', angular.toJson(paymentModes.prepaids));
        localStorageService.set('cards', angular.toJson(paymentModes.cards));
        return AuthService.retrieveUser();

      })
      .then(function (user) {
        // Check the count of products and then decide to fetch
        role = user.role;
        if (user.role === 'BOSS') {
          return CommonService.getCount('Product', null, null, null, null);
        } else {
          return CommonService.getCount('Product', null, null, 'stores', [
            user.id
          ]);
        }

      })
      .then(function (count) {
        $log.log('Count of items on server ' + count);
        if (role === 'BOSS') {
          return StockService.fetchToLocal(count);
        } else {
          return StockService.fetchToLocal(count, user.id);
        }
      })
      .then(function (products) {
        $log.log('all products stored locally');
        $state.go('app.mainframe');
      })
      .catch(function (error) {
        $log.error(error);
        vm.signUpLoading = false;
        vm.error = error;
      });
  };

  this.showName = function () {
    vm.loading = true;

    AuthService.checkBrandName(vm.user.username)
      .then(function (result) {
        vm.loading = false;
        vm.user.name = result.name;
      })
      .catch(function (error) {
        vm.loading = false;
        vm.error = error;
      });
  };

  this.closeError = function () {
    vm.error = false;
  };

  this.changePassword = function () {
    vm.error = false;
    vm.signUpLoading = true;
    AuthService
      .changePassword(vm.phone.toString())
      .then(function (success) {
        vm.signUpLoading = false;
        $window.alert('Password reset link has been sent on your mail ID');
      })
      .catch(function (error) {
        vm.signUpLoading = false;

        vm.error = error;
      });
  };

  this.show = function (state) {
    vm.showPanel = state;
    if (vm.error) {
      vm.closeError();
    }
  };

  this.checkUsername = function () {
    if (vm.user.username && vm.user.username.length === 10) {
      vm.showName();
    }
  };

  $scope.$watch('user.username', function (newVal) {
    $log.log('changed to: ' + newVal);
    if (newVal && newVal.length === 10) {
      vm.showName();
      $log.log('Changing the value to ' + newVal);
    }
  });
}

module.exports = {
  template: require('./login.html'),
  controller: loginController
};
