(function () {
    'use strict';

    angular
        .module('mainApp')
        .controller('govtThankYouCtrl', govtThankYouCtrl);

    govtThankYouCtrl.$inject = ['$stateParams', '$rootScope', '$http', '$state', '$timeout', '$location', 'localStorageService'];

    function govtThankYouCtrl($stateParams, $rootScope, $http, $state,$timeout,$location, localStorageService) {

        var vm = this;
        vm.name = "";
        activate();
       

        function activate() {
            vm.name = localStorageService.get("Name");
            $timeout(function () {
                window.location.href = 'https://www.pensionwise.gov.uk';
            }, 10000);

        }

    }
})();