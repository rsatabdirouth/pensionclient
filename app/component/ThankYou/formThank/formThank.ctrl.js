(function () {
    'use strict';

    angular
        .module('mainApp')
        .controller('thankYouCtrl', thankYouCtrl);

    thankYouCtrl.$inject = ['$stateParams', '$rootScope', '$http', '$state', 'localStorageService'];

    function thankYouCtrl($stateParams, $rootScope, $http, $state, localStorageService) {

        var vm = this;
        //vm.Form = {};
        vm.name = "";
        activate();


        function activate() {
            vm.name = localStorageService.get("Name");
            ////console.log(LeadID);
            //console.log(thankForm);
        }



    }
})();