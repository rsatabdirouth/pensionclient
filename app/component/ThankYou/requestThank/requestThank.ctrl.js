(function () {
    'use strict';

    angular
        .module('mainApp')
        .controller('reqThankYouCtrl', reqThankYouCtrl);

    reqThankYouCtrl.$inject = ['$stateParams', '$rootScope', '$http', '$state', 'localStorageService'];

    function reqThankYouCtrl($stateParams, $rootScope, $http, $state, localStorageService) {

        var vm = this;
        //vm.Form = {};
        vm.Name = "";
        activate();
        //$rootScope.showModal = true;

        function activate() {
            vm.Name = localStorageService.get("Name");
            ////console.log(LeadID);
            //console.log(thankForm);
        }



    }
})();